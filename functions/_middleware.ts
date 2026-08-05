// Global SEO middleware for every HTML response.
// Goals (from Search Console diagnostics):
//  1. Every crawled URL must carry a self-referencing canonical
//     -> kills "Duplicate without user-selected canonical".
//  2. Query-string variants (?ref=, ?page=, utm_*) canonicalise to the clean path
//     -> kills duplicate crawling and wasted crawl budget.
//  3. Never let an unexpected error bubble up as a 5xx to Googlebot.
// Route-specific functions (book/author/landing prerenders) already inject their
// own canonical; we only add one when it is missing, so we never override them.

const SITE = 'https://kotobi.xyz';

// Paths that must never be indexed (private / duplicate-generating areas).
const NOINDEX_PREFIXES = [
  '/auth',
  '/reset-password',
  '/profile',
  '/my-books',
  '/messages',
  '/admin',
  '/search',
  '/book/reading/',
  '/pdf-reader',
  '/notifications',
  '/settings',
];

function isNoindexPath(pathname: string) {
  const p = pathname.toLowerCase();
  return NOINDEX_PREFIXES.some((prefix) => p === prefix || p.startsWith(prefix + '/') || p.startsWith(prefix + '?') || p.startsWith(prefix));
}

export const onRequest = async (context: any) => {
  const { request, next } = context;
  const url = new URL(request.url);

  let response: Response;
  try {
    response = await next();
  } catch (error) {
    console.error('SEO middleware: downstream error', error);
    return new Response('Service temporarily unavailable', {
      status: 503,
      headers: { 'Retry-After': '120', 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('text/html')) return response;

  try {
    let html = await response.text();
    const headers = new Headers(response.headers);

    // Clean, canonical form of this URL: no query string, no trailing slash.
    let pathname = url.pathname;
    if (pathname.length > 1 && pathname.endsWith('/')) pathname = pathname.slice(0, -1);
    const canonicalUrl = `${SITE}${pathname}`;

    const noindex = isNoindexPath(pathname);

    if (noindex) {
      headers.set('X-Robots-Tag', 'noindex, follow');
      if (/<meta[^>]*\sname=["']robots["'][^>]*>/i.test(html)) {
        html = html.replace(
          /<meta[^>]*\sname=["']robots["'][^>]*>/i,
          '<meta name="robots" content="noindex, follow">'
        );
      } else {
        html = html.replace('</head>', '<meta name="robots" content="noindex, follow">\n</head>');
      }
    } else if (!/<link[^>]*\srel=["']canonical["'][^>]*>/i.test(html)) {
      // No canonical was injected by a route function -> add a self-referencing one.
      html = html.replace(
        '</head>',
        `<link rel="canonical" href="${canonicalUrl}">\n</head>`
      );
      // The static shell ships og:url pointing at the homepage — make it self-referencing.
      const ogUrlTag = `<meta property="og:url" content="${canonicalUrl}">`;
      html = /<meta[^>]*\sproperty=["']og:url["'][^>]*>/i.test(html)
        ? html.replace(/<meta[^>]*\sproperty=["']og:url["'][^>]*>/i, ogUrlTag)
        : html.replace('</head>', `${ogUrlTag}\n</head>`);
    }

    headers.delete('content-length');
    return new Response(html, { status: response.status, headers });
  } catch (error) {
    console.error('SEO middleware: rewrite failed', error);
    return response;
  }
};
