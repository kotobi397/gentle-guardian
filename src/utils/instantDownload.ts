import { resolvePdfDownloadUrl, isSupabaseStorageUrl } from '@/utils/imageProxy';

/**
 * يبني رابط تحميل فوري:
 * - روابط Supabase Storage تدعم ?download=<name> فتُرجع Content-Disposition: attachment
 *   وبالتالي يبدأ التنزيل فورًا دون تحميل الملف كاملًا في الذاكرة (blob).
 */
export const buildInstantDownloadUrl = (rawUrl: string, fileName: string): string => {
  const direct = resolvePdfDownloadUrl(rawUrl);
  try {
    const url = new URL(direct, window.location.origin);
    if (isSupabaseStorageUrl(url.href)) {
      url.searchParams.set('download', fileName);
    }
    return url.href;
  } catch {
    return direct;
  }
};

/**
 * يبدأ التنزيل فورًا عبر رابط مباشر (بدون fetch/blob).
 */
export const startInstantDownload = (rawUrl: string, fileName: string): void => {
  const href = buildInstantDownloadUrl(rawUrl, fileName);
  const link = document.createElement('a');
  link.href = href;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
