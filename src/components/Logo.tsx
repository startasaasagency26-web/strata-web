import { StrataLockup } from './brand/StrataLockup';
import { StrataMark } from './brand/StrataMark';

interface LogoProps {
  variant?: 'mark' | 'lockup';
  tone?: 'gold' | 'mono' | 'inherit';
  className?: string;
}

export const Logo = ({ variant = 'mark', tone = 'inherit', className = '' }: LogoProps) => {
  const toneClass = tone === 'gold' ? 'text-gold' : tone === 'mono' ? 'text-text' : '';
  const classes = `select-none pointer-events-none ${toneClass} ${className}`;
  const gradient = tone === 'gold';

  return variant === 'lockup'
    ? <StrataLockup className={classes} gradient={gradient} />
    : <StrataMark className={classes} gradient={gradient} />;
};
