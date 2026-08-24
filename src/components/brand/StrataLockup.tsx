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
      viewBox="-12 -8 460 178"
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
        <path d="M137 4H54C20 4 4 22 4 50s20 44 50 44h38c24 0 38 14 38 32s-15 32-38 32H18l10-16" />
        <path d="M96 98L143 4l43 154" />
      </g>
      <text
        x="214"
        y="94"
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
