import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({
  label,
  children,
  ariaLabel,
  className = '',
  style,
  ...props
}: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel || label}
      className={clsx(
        'px-2.5 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      style={{
        backgroundColor: 'var(--primary)',
        color: 'var(--primary-foreground)',
        ...style,
      }}
      {...props}
    >
      {children ?? label}
    </button>
  );
};
