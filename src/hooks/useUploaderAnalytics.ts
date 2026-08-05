import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface UploaderBookAnalytics {
  book_id: string;
  title: string;
  cover_image_url: string | null;
  slug: string | null;
  category: string | null;
  created_at: string;
  downloads: number;
  reads_online: number;
  card_clicks: number;
  detail_views: number;
  views: number;
  reviews_count: number;
  average_rating: number;
  likes_count: number;
  completions: number;
  avg_progress: number;
}

export interface UploaderCountry {
  country_code: string;
  country_name: string;
  events: number;
  reads_online: number;
  downloads: number;
}

export interface UploaderTimelinePoint {
  day: string;
  card_clicks: number;
  detail_views: number;
  reads_online: number;
  downloads: number;
}

const toNumber = (value: unknown) => Number(value ?? 0) || 0;

export const useUploaderAnalytics = (days: number, bookId?: string | null) => {
  const [books, setBooks] = useState<UploaderBookAnalytics[]>([]);
  const [countries, setCountries] = useState<UploaderCountry[]>([]);
  const [timeline, setTimeline] = useState<UploaderTimelinePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [booksRes, countriesRes, timelineRes] = await Promise.all([
        supabase.rpc('get_uploader_book_analytics', { p_days: days }),
        supabase.rpc('get_uploader_top_countries', {
          p_book_id: bookId ?? null,
          p_days: days,
          p_limit: 12,
        }),
        supabase.rpc('get_uploader_events_timeline', {
          p_days: days > 0 ? days : 30,
          p_book_id: bookId ?? null,
        }),
      ]);

      if (booksRes.error) throw booksRes.error;

      setBooks(
        ((booksRes.data as any[]) || []).map((row) => ({
          ...row,
          downloads: toNumber(row.downloads),
          reads_online: toNumber(row.reads_online),
          card_clicks: toNumber(row.card_clicks),
          detail_views: toNumber(row.detail_views),
          views: toNumber(row.views),
          reviews_count: toNumber(row.reviews_count),
          average_rating: toNumber(row.average_rating),
          likes_count: toNumber(row.likes_count),
          completions: toNumber(row.completions),
          avg_progress: toNumber(row.avg_progress),
        })),
      );

      setCountries(
        ((countriesRes.data as any[]) || []).map((row) => ({
          country_code: row.country_code,
          country_name: row.country_name,
          events: toNumber(row.events),
          reads_online: toNumber(row.reads_online),
          downloads: toNumber(row.downloads),
        })),
      );

      setTimeline(
        ((timelineRes.data as any[]) || []).map((row) => ({
          day: row.day,
          card_clicks: toNumber(row.card_clicks),
          detail_views: toNumber(row.detail_views),
          reads_online: toNumber(row.reads_online),
          downloads: toNumber(row.downloads),
        })),
      );
    } catch (err: any) {
      console.error('[useUploaderAnalytics] خطأ:', err);
      setError('حدث خطأ في جلب الإحصائيات');
    } finally {
      setLoading(false);
    }
  }, [days, bookId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { books, countries, timeline, loading, error, refetch: fetchAll };
};
