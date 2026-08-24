import { useId } from 'react';

interface StrataLockupProps {
  className?: string;
  gradient?: boolean;
  title?: string;
}

export const StrataLockup = ({ className = '', gradient = false, title = 'Strata' }: StrataLockupProps) => {
  const gradientId = `strata-lockup-gold-${useId().replace(/:/g, '')}`;
  const paint = gradient ? `url(#${gradientId})` : 'currentColor';

  return (
    <svg
      viewBox="-12 -8 460 158"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {gradient && (
        <defs>
          <linearGradient id={gradientId} x1="12" y1="8" x2="424" y2="138" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgb(var(--champagne))" />
            <stop offset="0.52" stopColor="rgb(var(--gold))" />
            <stop offset="1" stopColor="rgb(var(--bronze))" />
          </linearGradient>
        </defs>
      )}
      <g stroke={paint} strokeWidth="8" strokeLinecap="butt" strokeLinejoin="miter">
        <path d="M122 12H51C23 12 8 27 8 50s17 38 43 38h38c20 0 31 11 31 27s-12 27-31 27H18l9-16h62c10 0 15-4 15-11s-5-11-15-11H51C15 104-8 83-8 50S15-4 51-4h80" />
        <path d="M94 101L143 4l43 138" />
      </g>
      <text
        x="214"
        y="84"
        fill={paint}
        fontFamily="Inter, sans-serif"
        fontSize="28"
        fontWeight="300"
        letterSpacing="0.4em"
      >
        STRATA
      </text>
    </svg>
  );
};
