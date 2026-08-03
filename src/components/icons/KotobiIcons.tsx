import React from 'react';

/**
 * مجموعة أيقونات "كتبي" الخاصة — مرسومة يدوياً بأسلوب Clash:
 * خطوط سميكة، زوايا دائرية، وتعبئة خفيفة باللون الحالي.
 * كلها تعتمد currentColor حتى تتبع ألوان النظام (ذهبي/ورقي) في كل الحالات.
 */

export type KotobiIconProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
};

const make = (
  displayName: string,
  paths: React.ReactNode
): React.FC<KotobiIconProps> => {
  const Comp: React.FC<KotobiIconProps> = ({
    className = 'h-5 w-5',
    size,
    strokeWidth = 2.1,
    ...rest
  }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {paths}
    </svg>
  );
  Comp.displayName = displayName;
  return Comp;
};

const soft = 0.14;

/* ============ التنقل والواجهة ============ */

export const IconSearch = make(
  'IconSearch',
  <>
    <circle cx="10.5" cy="10.5" r="6" fill="currentColor" fillOpacity={soft} />
    <path d="M8 9.2h5M8 12h3.5" />
    <path d="m15.2 15.2 4.3 4.3" />
  </>
);

export const IconMenu = make(
  'IconMenu',
  <>
    <rect x="3" y="4" width="18" height="4.2" rx="1.6" fill="currentColor" fillOpacity={soft} />
    <rect x="3" y="9.9" width="18" height="4.2" rx="1.6" />
    <rect x="3" y="15.8" width="18" height="4.2" rx="1.6" fill="currentColor" fillOpacity={soft} />
  </>
);

export const IconHome = make(
  'IconHome',
  <>
    <path d="M3.6 10.4 12 3.6l8.4 6.8V19a1.6 1.6 0 0 1-1.6 1.6H5.2A1.6 1.6 0 0 1 3.6 19z" fill="currentColor" fillOpacity={soft} />
    <path d="M9.4 20.4v-5.6h5.2v5.6" />
  </>
);

export const IconBell = make(
  'IconBell',
  <>
    <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.3 1.7a.6.6 0 0 1-.5 1H5.2a.6.6 0 0 1-.5-1z" fill="currentColor" fillOpacity={soft} />
    <path d="M10 21.2a2.4 2.4 0 0 0 4 0" />
  </>
);

export const IconMail = make(
  'IconMail',
  <>
    <rect x="2.6" y="5" width="18.8" height="14" rx="3" fill="currentColor" fillOpacity={soft} />
    <path d="m4.5 8.2 6.2 4.6a2.2 2.2 0 0 0 2.6 0l6.2-4.6" />
  </>
);

export const IconHeart = make(
  'IconHeart',
  <path d="M12 20.2s-7.6-4.4-7.6-9.5A4.6 4.6 0 0 1 12 8.1a4.6 4.6 0 0 1 7.6 2.6c0 5.1-7.6 9.5-7.6 9.5Z" fill="currentColor" fillOpacity={0.18} />
);

export const IconTrophy = make(
  'IconTrophy',
  <>
    <path d="M7 4h10v5a5 5 0 0 1-10 0z" fill="currentColor" fillOpacity={0.18} />
    <path d="M7 5.6H4.6v1.6A3.4 3.4 0 0 0 7.4 10.5M17 5.6h2.4v1.6a3.4 3.4 0 0 1-2.8 3.3" />
    <path d="M12 14v3.2M8.6 20.2h6.8" />
  </>
);

export const IconGear = make(
  'IconGear',
  <>
    <path d="M12 3.2 14 5l2.5-.6 1 2.4 2.3 1.2-.7 2.5.7 2.5-2.3 1.2-1 2.4-2.5-.6-2 1.8-2-1.8-2.5.6-1-2.4L3.2 14l.7-2.5-.7-2.5 2.3-1.2 1-2.4L9 6z" fill="currentColor" fillOpacity={soft} />
    <circle cx="12" cy="11.5" r="3" />
  </>
);

export const IconChat = make(
  'IconChat',
  <>
    <path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v7A2.5 2.5 0 0 1 18 16H10l-4.4 3.6V16H6a2.5 2.5 0 0 1-2.5-2.5z" fill="currentColor" fillOpacity={0.13} />
    <path d="M7.5 8.6h9M7.5 11.8h6" />
  </>
);

export const IconBookOpen = make(
  'IconBookOpen',
  <>
    <path d="M12 6.6C10.4 5.1 8.2 4.5 4.6 4.6a1 1 0 0 0-1 1v11.6a1 1 0 0 0 1.05 1c3.3-.1 5.4.4 7.35 1.7 1.95-1.3 4.05-1.8 7.35-1.7a1 1 0 0 0 1.05-1V5.6a1 1 0 0 0-1-1c-3.6-.1-5.8.5-7.4 2z" fill="currentColor" fillOpacity={0.13} />
    <path d="M12 6.6v13.3" />
  </>
);

export const IconShield = make(
  'IconShield',
  <>
    <path d="M12 3.2 4.8 6v6c0 4.2 3 7.2 7.2 8.8 4.2-1.6 7.2-4.6 7.2-8.8V6z" fill="currentColor" fillOpacity={soft} />
    <path d="m9 12 2.2 2.2L15.3 10" />
  </>
);

/* ============ المستخدمون ============ */

export const IconUser = make(
  'IconUser',
  <>
    <circle cx="12" cy="8.2" r="3.8" fill="currentColor" fillOpacity={soft} />
    <path d="M4.6 20.2c.7-3.8 3.7-5.8 7.4-5.8s6.7 2 7.4 5.8" />
  </>
);

export const IconUsers = make(
  'IconUsers',
  <>
    <circle cx="9.4" cy="8.4" r="3.4" fill="currentColor" fillOpacity={soft} />
    <path d="M3 19.8c.6-3.3 3.2-5.1 6.4-5.1s5.8 1.8 6.4 5.1" />
    <path d="M16.4 5.4a3.4 3.4 0 0 1 0 6.6M17.6 14.9c2.1.5 3.4 2.1 3.8 4.4" />
  </>
);

export const IconCrown = make(
  'IconCrown',
  <>
    <path d="M3.6 8.4 7.4 12l4.6-6 4.6 6 3.8-3.6-1.6 9.4H5.2z" fill="currentColor" fillOpacity={0.18} />
    <path d="M5.2 20.4h13.6" />
  </>
);

/* ============ الحالات والإجراءات ============ */

export const IconCheck = make('IconCheck', <path d="m4.8 12.6 4.6 4.6L19.4 7" />);

export const IconCheckCircle = make(
  'IconCheckCircle',
  <>
    <circle cx="12" cy="12" r="8.8" fill="currentColor" fillOpacity={soft} />
    <path d="m8 12.2 2.8 2.8L16.4 9.4" />
  </>
);

export const IconX = make('IconX', <path d="M6 6l12 12M18 6 6 18" />);

export const IconXCircle = make(
  'IconXCircle',
  <>
    <circle cx="12" cy="12" r="8.8" fill="currentColor" fillOpacity={soft} />
    <path d="m9 9 6 6M15 9l-6 6" />
  </>
);

export const IconAlert = make(
  'IconAlert',
  <>
    <path d="M12 3.6 21.4 20H2.6z" fill="currentColor" fillOpacity={soft} />
    <path d="M12 9.4v4.4M12 17.2h.01" />
  </>
);

export const IconInfoCircle = make(
  'IconInfoCircle',
  <>
    <circle cx="12" cy="12" r="8.8" fill="currentColor" fillOpacity={soft} />
    <path d="M12 11v5.2M12 7.8h.01" />
  </>
);

export const IconPlus = make('IconPlus', <path d="M12 5v14M5 12h14" />);

export const IconTrash = make(
  'IconTrash',
  <>
    <path d="M5.4 7h13.2l-1.1 12.1a1.6 1.6 0 0 1-1.6 1.5H8.1a1.6 1.6 0 0 1-1.6-1.5z" fill="currentColor" fillOpacity={soft} />
    <path d="M9.4 7V5.2c0-.7.5-1.2 1.2-1.2h2.8c.7 0 1.2.5 1.2 1.2V7M10.2 11v5.4M13.8 11v5.4M3.6 7h16.8" />
  </>
);

export const IconEdit = make(
  'IconEdit',
  <>
    <path d="M4.4 15.6 15.6 4.4l4 4L8.4 19.6l-5 1z" fill="currentColor" fillOpacity={soft} />
    <path d="m13.4 6.6 4 4" />
  </>
);

export const IconEye = make(
  'IconEye',
  <>
    <path d="M2.6 12S6 5.8 12 5.8 21.4 12 21.4 12 18 18.2 12 18.2 2.6 12 2.6 12Z" fill="currentColor" fillOpacity={soft} />
    <circle cx="12" cy="12" r="3.1" />
  </>
);

export const IconEyeOff = make(
  'IconEyeOff',
  <>
    <path d="M4.4 8.2C3.2 9.6 2.6 12 2.6 12S6 18.2 12 18.2c1.8 0 3.3-.5 4.6-1.2M9.4 6.2c.8-.3 1.7-.4 2.6-.4 6 0 9.4 6.2 9.4 6.2s-.9 1.7-2.6 3.3" />
    <path d="M9.9 9.9a3.1 3.1 0 0 0 4.3 4.3M3.6 3.6l16.8 16.8" />
  </>
);

export const IconDownload = make(
  'IconDownload',
  <>
    <path d="M12 3.8v10.4M7.6 10l4.4 4.2 4.4-4.2" />
    <path d="M4.2 15.6v3a1.8 1.8 0 0 0 1.8 1.8h12a1.8 1.8 0 0 0 1.8-1.8v-3" fill="currentColor" fillOpacity={soft} />
  </>
);

export const IconUpload = make(
  'IconUpload',
  <>
    <path d="M12 20.2V9.8M7.6 14l4.4-4.2 4.4 4.2" />
    <path d="M4.2 8.4v-3a1.8 1.8 0 0 1 1.8-1.8h12a1.8 1.8 0 0 1 1.8 1.8v3" fill="currentColor" fillOpacity={soft} />
  </>
);

export const IconSend = make(
  'IconSend',
  <>
    <path d="M20.6 3.6 3.8 10.4l6.6 2.6 2.6 6.6z" fill="currentColor" fillOpacity={soft} />
    <path d="m10.4 13 4.6-4.6" />
  </>
);

export const IconShare = make(
  'IconShare',
  <>
    <circle cx="6.2" cy="12" r="2.6" fill="currentColor" fillOpacity={soft} />
    <circle cx="17.4" cy="6" r="2.6" fill="currentColor" fillOpacity={soft} />
    <circle cx="17.4" cy="18" r="2.6" fill="currentColor" fillOpacity={soft} />
    <path d="m8.6 10.8 6.4-3.4M8.6 13.2l6.4 3.4" />
  </>
);

export const IconCopy = make(
  'IconCopy',
  <>
    <rect x="8.4" y="8.4" width="11.4" height="11.4" rx="2.4" fill="currentColor" fillOpacity={soft} />
    <path d="M15.6 5.6a1.8 1.8 0 0 0-1.8-1.8H6.2a2.4 2.4 0 0 0-2.4 2.4v7.6a1.8 1.8 0 0 0 1.8 1.8" />
  </>
);

export const IconRefresh = make(
  'IconRefresh',
  <>
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20.4 3.6v5h-5" />
  </>
);

export const IconExternal = make(
  'IconExternal',
  <>
    <path d="M13.6 4.2h6.2v6.2M19.8 4.2 11 13" />
    <path d="M18 14v4.6a1.8 1.8 0 0 1-1.8 1.8H5.6a1.8 1.8 0 0 1-1.8-1.8V7.8A1.8 1.8 0 0 1 5.6 6H10" fill="currentColor" fillOpacity={soft} />
  </>
);

export const IconLock = make(
  'IconLock',
  <>
    <rect x="4.4" y="10.2" width="15.2" height="10.2" rx="2.6" fill="currentColor" fillOpacity={soft} />
    <path d="M8 10.2V7.8a4 4 0 0 1 8 0v2.4M12 14.2v2.4" />
  </>
);

/* ============ الزمن والبيانات ============ */

export const IconClock = make(
  'IconClock',
  <>
    <circle cx="12" cy="12" r="8.8" fill="currentColor" fillOpacity={soft} />
    <path d="M12 7.2V12l3.2 2" />
  </>
);

export const IconCalendar = make(
  'IconCalendar',
  <>
    <rect x="3.6" y="5.4" width="16.8" height="15" rx="2.6" fill="currentColor" fillOpacity={soft} />
    <path d="M3.6 10h16.8M8.4 3.6v3.4M15.6 3.6v3.4" />
  </>
);

export const IconFileText = make(
  'IconFileText',
  <>
    <path d="M6 3.6h7.4l4.6 4.6v12.2H6z" fill="currentColor" fillOpacity={soft} />
    <path d="M13.4 3.6v4.6H18M9 12.4h6M9 16h4.4" />
  </>
);

export const IconGlobe = make(
  'IconGlobe',
  <>
    <circle cx="12" cy="12" r="8.8" fill="currentColor" fillOpacity={soft} />
    <path d="M3.4 12h17.2M12 3.2c2.4 2.5 3.6 5.4 3.6 8.8s-1.2 6.3-3.6 8.8c-2.4-2.5-3.6-5.4-3.6-8.8S9.6 5.7 12 3.2Z" />
  </>
);

export const IconTrendingUp = make(
  'IconTrendingUp',
  <>
    <path d="m3.6 16.6 5-5 3.4 3.4 6.4-6.6" />
    <path d="M14.6 8.4h4.8v4.8" />
  </>
);

export const IconStar = make(
  'IconStar',
  <path d="m12 3.8 2.7 5.5 6 .9-4.3 4.2 1 6-5.4-2.8-5.4 2.8 1-6-4.3-4.2 6-.9z" fill="currentColor" fillOpacity={0.18} />
);

export const IconQuote = make(
  'IconQuote',
  <>
    <path d="M9.4 6.2c-3 1.2-4.6 3.5-4.6 6.9v4.7h6V12H7.6c0-2 .8-3.4 2.6-4.2z" fill="currentColor" fillOpacity={0.18} />
    <path d="M19 6.2c-3 1.2-4.6 3.5-4.6 6.9v4.7h6V12h-3.2c0-2 .8-3.4 2.6-4.2z" fill="currentColor" fillOpacity={0.18} />
  </>
);

export const IconSparkles = make(
  'IconSparkles',
  <>
    <path d="m10 3.8 1.7 4 4 1.7-4 1.7-1.7 4-1.7-4-4-1.7 4-1.7z" fill="currentColor" fillOpacity={0.18} />
    <path d="m17.4 14.2.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" fill="currentColor" fillOpacity={0.18} />
  </>
);

export const IconFlame = make(
  'IconFlame',
  <path d="M12 3.4c3 3 4.8 5.3 4.8 7.6 0 1.2-.5 2.2-1.3 2.9.3-1.9-.6-3.4-2.3-4.6.3 3-1.3 4-2.6 5.2-1 1-1.6 2-1.6 3.2A5 5 0 0 0 14 21.4c2.6-.8 4.6-3.2 4.6-6.2 0-4.4-3-8.2-6.6-11.8Z" fill="currentColor" fillOpacity={0.18} />
);

export const IconCoins = make(
  'IconCoins',
  <>
    <ellipse cx="12" cy="7.2" rx="7.4" ry="3.4" fill="currentColor" fillOpacity={soft} />
    <path d="M4.6 7.2v4.4c0 1.9 3.3 3.4 7.4 3.4s7.4-1.5 7.4-3.4V7.2" />
    <path d="M4.6 11.6V16c0 1.9 3.3 3.4 7.4 3.4s7.4-1.5 7.4-3.4v-4.4" />
  </>
);

export const IconGift = make(
  'IconGift',
  <>
    <rect x="3.6" y="9.4" width="16.8" height="10.8" rx="2" fill="currentColor" fillOpacity={soft} />
    <path d="M2.8 9.4h18.4v3.4H2.8zM12 9.4v10.8" />
    <path d="M12 9.4C10.6 6.6 9.4 5.4 7.9 5.4a2.2 2.2 0 0 0 0 4.4M12 9.4c1.4-2.8 2.6-4 4.1-4a2.2 2.2 0 0 1 0 4.4" />
  </>
);

export const IconAward = make(
  'IconAward',
  <>
    <circle cx="12" cy="9.2" r="5.4" fill="currentColor" fillOpacity={soft} />
    <path d="m8.6 13.8-1.4 6.6L12 18l4.8 2.4-1.4-6.6" />
  </>
);

export const IconMegaphone = make(
  'IconMegaphone',
  <>
    <path d="M4 10.2 18.4 5v14L4 13.8z" fill="currentColor" fillOpacity={soft} />
    <path d="M6.6 14.4v3.4a2 2 0 0 0 3.9.6M20.4 10v4" />
  </>
);

export const IconImage = make(
  'IconImage',
  <>
    <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6" fill="currentColor" fillOpacity={soft} />
    <circle cx="8.6" cy="9.6" r="1.6" />
    <path d="m4.4 17 4.8-4.6 4 3.6 2.8-2.4 3.6 3.4" />
  </>
);

export const IconPalette = make(
  'IconPalette',
  <>
    <path d="M12 3.6a8.4 8.4 0 0 0 0 16.8c1.3 0 2-.8 2-1.8 0-1.6-1.2-1.8-1.2-3 0-.9.8-1.6 1.8-1.6h1.6a4.2 4.2 0 0 0 4.2-4.2c0-3.4-3.6-6.2-8.4-6.2Z" fill="currentColor" fillOpacity={soft} />
    <circle cx="8" cy="10" r="1.1" />
    <circle cx="12" cy="7.6" r="1.1" />
    <circle cx="16" cy="10" r="1.1" />
  </>
);

export const IconPlay = make('IconPlay', <path d="M7.4 4.8 19 12 7.4 19.2z" fill="currentColor" fillOpacity={0.18} />);

export const IconPause = make(
  'IconPause',
  <>
    <rect x="6.4" y="4.8" width="4" height="14.4" rx="1.4" fill="currentColor" fillOpacity={0.18} />
    <rect x="13.6" y="4.8" width="4" height="14.4" rx="1.4" fill="currentColor" fillOpacity={0.18} />
  </>
);

export const IconChevronLeft = make('IconChevronLeft', <path d="M14.8 5.6 8.4 12l6.4 6.4" />);
export const IconChevronRight = make('IconChevronRight', <path d="M9.2 5.6 15.6 12l-6.4 6.4" />);

export const IconBot = make(
  'IconBot',
  <>
    <rect x="4" y="7.4" width="16" height="11.2" rx="3" fill="currentColor" fillOpacity={soft} />
    <path d="M12 4v3.4M8.8 12.4h.01M15.2 12.4h.01M9.6 15.8h4.8" />
  </>
);

export default {
  IconSearch,
  IconMenu,
  IconHome,
  IconBell,
  IconMail,
  IconHeart,
  IconTrophy,
  IconGear,
  IconChat,
  IconBookOpen,
  IconShield,
};
