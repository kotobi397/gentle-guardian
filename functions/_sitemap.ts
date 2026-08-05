// Shared sitemap logic — sitemap index + chunked child sitemaps
// Keeps every single sitemap file small & fast (Google limit: 50k URLs / 50MB)

export const SITE = 'https://kotobi.xyz';
export const SUPABASE_URL = 'https://kydmyxsgyxeubhmqzrgo.supabase.co';
export const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5ZG15eHNneXhldWJobXF6cmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODQ3NjQsImV4cCI6MjA2MjA2MDc2NH0.b-ckDfOmmf2x__FG5Snm9px8j4pqPke5Ra1RgoGEqP0';

// Rows fetched per child sitemap. Books produce 4 URLs per row (book + 3 landings),
// so 5000 rows = 20k URLs — well under the 50k limit and fast to render.
export const BOOKS_PER_FILE = 5000;
export const ROWS_PER_FILE = 20000;

export const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
};

export function encodePathSegment(value: string) {
  try {
    return encodeURIComponent(decodeURIComponent(value));
  } catch {
    return encodeURIComponent(value);
  }
}

export function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function iso(value?: string | null) {
  const d = value ? new Date(value) : new Date();
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

export interface Url {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export function xmlResponse(body: string, maxAge = 3600) {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=${maxAge}`,
      'X-Robots-Tag': 'noindex',
    },
  });
}

export function renderUrlset(urls: Url[]) {
  const body = urls
    .map(
      (u) => `  <url>
    <loc>${xmlEscape(u.url)}</loc>${u.lastmod ? `
    <lastmod>${u.lastmod}</lastmod>` : ''}
    <changefreq>${u.changefreq || 'weekly'}</changefreq>
    <priority>${u.priority ?? 0.5}</priority>
  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export function renderIndex(entries: { loc: string; lastmod?: string }[]) {
  const body = entries
    .map(
      (e) => `  <sitemap>
    <loc>${xmlEscape(e.loc)}</loc>${e.lastmod ? `
    <lastmod>${e.lastmod}</lastmod>` : ''}
  </sitemap>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;
}

/** Exact row count via PostgREST HEAD + Content-Range */
export async function countRows(table: string, filter = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=id${filter}&limit=1`, {
    method: 'HEAD',
    headers: { ...headers, Prefer: 'count=exact' },
  });
  const range = res.headers.get('content-range') || '';
  const total = parseInt(range.split('/')[1] || '0', 10);
  return isNaN(total) ? 0 : total;
}

export async function fetchRows(path: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers });
  if (!res.ok) return [];
  return (await res.json()) as any[];
}

export const STATIC_PAGES: Url[] = [
  { url: `${SITE}/`, changefreq: 'daily', priority: 1.0 },
  { url: `${SITE}/categories`, changefreq: 'weekly', priority: 0.9 },
  { url: `${SITE}/authors`, changefreq: 'weekly', priority: 0.9 },
  { url: `${SITE}/quotes`, changefreq: 'daily', priority: 0.8 },
  { url: `${SITE}/reading-clubs`, changefreq: 'weekly', priority: 0.7 },
  { url: `${SITE}/suggestions`, changefreq: 'weekly', priority: 0.7 },
  { url: `${SITE}/upload-book`, changefreq: 'monthly', priority: 0.6 },
  { url: `${SITE}/leaderboard`, changefreq: 'weekly', priority: 0.6 },
  { url: `${SITE}/about-us`, changefreq: 'monthly', priority: 0.5 },
  { url: `${SITE}/contact-us`, changefreq: 'monthly', priority: 0.5 },
  { url: `${SITE}/donation`, changefreq: 'monthly', priority: 0.5 },
  { url: `${SITE}/site-updates`, changefreq: 'weekly', priority: 0.5 },
  { url: `${SITE}/privacy-policy`, changefreq: 'yearly', priority: 0.3 },
  { url: `${SITE}/terms-of-service`, changefreq: 'yearly', priority: 0.3 },
];

/** Builds the sitemap index (small, instant to load) */
export async function buildIndex() {
  const [books, authors, users, categories] = await Promise.all([
    countRows('book_submissions', '&status=eq.approved'),
    countRows('authors'),
    countRows('profiles'),
    countRows('categories'),
  ]);

  const entries: { loc: string; lastmod?: string }[] = [{ loc: `${SITE}/sitemaps/pages.xml` }];

  const chunks = (total: number, per: number) => Math.max(1, Math.ceil(total / per));

  for (let i = 1; i <= chunks(books, BOOKS_PER_FILE); i++) {
    entries.push({ loc: `${SITE}/sitemaps/books-${i}.xml` });
  }
  for (let i = 1; i <= chunks(authors, ROWS_PER_FILE); i++) {
    entries.push({ loc: `${SITE}/sitemaps/authors-${i}.xml` });
  }
  for (let i = 1; i <= chunks(categories, ROWS_PER_FILE); i++) {
    entries.push({ loc: `${SITE}/sitemaps/categories-${i}.xml` });
  }
  for (let i = 1; i <= chunks(users, ROWS_PER_FILE); i++) {
    entries.push({ loc: `${SITE}/sitemaps/users-${i}.xml` });
  }

  return renderIndex(entries);
}

/** Builds one child sitemap: type + 1-based page number */
export async function buildChild(type: string, page: number): Promise<string | null> {
  const urls: Url[] = [];

  if (type === 'pages') {
    return renderUrlset(STATIC_PAGES);
  }

  if (type === 'books') {
    const offset = (page - 1) * BOOKS_PER_FILE;
    const rows = await fetchRows(
      `book_submissions?select=id,slug,reviewed_at,created_at&status=eq.approved&order=created_at.desc&offset=${offset}&limit=${BOOKS_PER_FILE}`
    );
    for (const book of rows) {
      const slug = encodePathSegment(book.slug || book.id);
      const lastmod = iso(book.reviewed_at || book.created_at);
      urls.push({ url: `${SITE}/book/${slug}`, lastmod, changefreq: 'monthly', priority: 0.8 });
      for (const prefix of ['tahmil', 'qiraa', 'molakhas']) {
        urls.push({ url: `${SITE}/${prefix}/${slug}`, lastmod, changefreq: 'monthly', priority: 0.7 });
      }
    }
    return renderUrlset(urls);
  }

  const offset = (page - 1) * ROWS_PER_FILE;

  if (type === 'authors') {
    const rows = await fetchRows(
      `authors?select=id,slug,name,created_at&order=created_at.desc&offset=${offset}&limit=${ROWS_PER_FILE}`
    );
    for (const a of rows) {
      const p = a.slug && a.slug.trim() !== '' ? a.slug : a.name;
      if (!p) continue;
      urls.push({
        url: `${SITE}/author/${encodePathSegment(p)}`,
        lastmod: iso(a.created_at),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
    return renderUrlset(urls);
  }

  if (type === 'categories') {
    const rows = await fetchRows(
      `categories?select=name,created_at&order=created_at.desc&offset=${offset}&limit=${ROWS_PER_FILE}`
    );
    for (const c of rows) {
      if (!c.name) continue;
      urls.push({
        url: `${SITE}/category/${encodePathSegment(c.name)}`,
        lastmod: iso(c.created_at),
        changefreq: 'weekly',
        priority: 0.7,
      });
    }
    return renderUrlset(urls);
  }

  if (type === 'users') {
    const rows = await fetchRows(
      `profiles?select=id,username,created_at,last_seen&order=created_at.desc&offset=${offset}&limit=${ROWS_PER_FILE}`
    );
    for (const u of rows) {
      const identifier = u.username && u.username.trim() !== '' ? u.username : u.id;
      if (!identifier) continue;
      urls.push({
        url: `${SITE}/user/${encodePathSegment(identifier)}`,
        lastmod: iso(u.last_seen || u.created_at),
        changefreq: 'weekly',
        priority: 0.6,
      });
    }
    return renderUrlset(urls);
  }

  return null;
}
