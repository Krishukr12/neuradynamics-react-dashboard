import { type ButtonHTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

export const Button = ({ label, children, ariaLabel, className = '', ...props }: ButtonProps) => {
  return (
    <button
      aria-label={ariaLabel || label}
      className={clsx(
        'px-2.5 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        'bg-[var(--primary)] text-[var(--primary-foreground)]',
        className
      )}
      {...props}
    >
      {children ?? label}
    </button>
  );
};
