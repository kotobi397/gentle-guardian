import React from 'react';

/**
 * مجموعة أيقونات "كتبي" الخاصة — مرسومة يدوياً بأسلوب Clash:
 * خطوط سميكة، زوايا دائرية، وتعبئة خفيفة باللون الحالي.
 * كلها تعتمد currentColor حتى تتبع ألوان النظام (ذهبي/ورقي) في كل الحالات.
 */

export type KotobiIconProps = {
  className?: string;
  strokeWidth?: number;
};

const wrap = (
  children: React.ReactNode,
  { className, strokeWidth = 2.2 }: KotobiIconProps
) => (
  <svg
    viewBox="0 0 24 24"
    className={className ?? 'h-5 w-5'}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    {children}
  </svg>
);

/** بحث: عدسة فوق كتاب */
export const IconSearch: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <circle cx="10.5" cy="10.5" r="6" fill="currentColor" fillOpacity="0.12" />
      <path d="M8 9.2h5M8 12h3.5" />
      <path d="m15.2 15.2 4.3 4.3" />
    </>,
    p
  );

/** القائمة: ثلاثة رفوف كتب */
export const IconMenu: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <rect x="3" y="4" width="18" height="4.2" rx="1.6" fill="currentColor" fillOpacity="0.14" />
      <rect x="3" y="9.9" width="18" height="4.2" rx="1.6" />
      <rect x="3" y="15.8" width="18" height="4.2" rx="1.6" fill="currentColor" fillOpacity="0.14" />
    </>,
    p
  );

/** إشعار: جرس بحبل */
export const IconBell: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path
        d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.3 1.7a.6.6 0 0 1-.5 1H5.2a.6.6 0 0 1-.5-1z"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path d="M10 21.2a2.4 2.4 0 0 0 4 0" />
    </>,
    p
  );

/** رسائل: ظرف بطية */
export const IconMail: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <rect x="2.6" y="5" width="18.8" height="14" rx="3" fill="currentColor" fillOpacity="0.12" />
      <path d="m4.5 8.2 6.2 4.6a2.2 2.2 0 0 0 2.6 0l6.2-4.6" />
    </>,
    p
  );

/** قلب سميك */
export const IconHeart: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <path
      d="M12 20.2s-7.6-4.4-7.6-9.5A4.6 4.6 0 0 1 12 8.1a4.6 4.6 0 0 1 7.6 2.6c0 5.1-7.6 9.5-7.6 9.5Z"
      fill="currentColor"
      fillOpacity="0.16"
    />,
    p
  );

/** كأس المكافآت */
export const IconTrophy: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="currentColor" fillOpacity="0.16" />
      <path d="M7 5.6H4.6v1.6A3.4 3.4 0 0 0 7.4 10.5M17 5.6h2.4v1.6a3.4 3.4 0 0 1-2.8 3.3" />
      <path d="M12 14v3.2M8.6 20.2h6.8" />
    </>,
    p
  );

/** ترس الإدارة */
export const IconGear: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path
        d="M12 3.2 14 5l2.5-.6 1 2.4 2.3 1.2-.7 2.5.7 2.5-2.3 1.2-1 2.4-2.5-.6-2 1.8-2-1.8-2.5.6-1-2.4L3.2 14l.7-2.5-.7-2.5 2.3-1.2 1-2.4L9 6z"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <circle cx="12" cy="11.5" r="3" />
    </>,
    p
  );

/** فقاعة حوار (اقتراحات / اتصل بنا) */
export const IconChat: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path
        d="M3.5 6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 16H10l-4.4 3.6V16H6a2.5 2.5 0 0 1-2.5-2.5z"
        fill="currentColor"
        fillOpacity="0.13"
      />
      <path d="M7.5 8.6h9M7.5 11.8h6" />
    </>,
    p
  );

/** كتاب مفتوح */
export const IconBookOpen: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path
        d="M12 6.6C10.4 5.1 8.2 4.5 4.6 4.6a1 1 0 0 0-1 1v11.6a1 1 0 0 0 1.05 1c3.3-.1 5.4.4 7.35 1.7 1.95-1.3 4.05-1.8 7.35-1.7a1 1 0 0 0 1.05-1V5.6a1 1 0 0 0-1-1c-3.6-.1-5.8.5-7.4 2z"
        fill="currentColor"
        fillOpacity="0.13"
      />
      <path d="M12 6.6v13.3" />
    </>,
    p
  );

/** درع الخصوصية */
export const IconShield: React.FC<KotobiIconProps> = (p) =>
  wrap(
    <>
      <path d="M12 3.2 4.8 6v6c0 4.2 3 7.2 7.2 8.8 4.2-1.6 7.2-4.6 7.2-8.8V6z" fill="currentColor" fillOpacity="0.14" />
      <path d="m9 12 2.2 2.2L15.3 10" />
    </>,
    p
  );

export default {
  IconSearch,
  IconMenu,
  IconBell,
  IconMail,
  IconHeart,
  IconTrophy,
  IconGear,
  IconChat,
  IconBookOpen,
  IconShield,
};
