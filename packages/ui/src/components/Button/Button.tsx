'use client';

import { Button as BaseButton } from '@base-ui-components/react/button';
import Link from 'next/link';

type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  href?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md';
};

export const Button = ({ href, variant = 'primary', size = 'md', ...props }: ButtonProps) => {
  const baseStyles = "cursor-pointer rounded-full font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm no-underline inline-flex";

  const variants = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary: "bg-secondary-container text-on-secondary-container hover:opacity-80",
    danger: "bg-error text-on-error hover:opacity-90",
    outline: "bg-transparent text-on-surface-container hover:bg-secondary hover:text-on-secondary transition-colors border border-outline"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm"
  };

  const className = `${baseStyles} ${variants[variant]} ${sizes[size]} ${props.className || ''}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {props.children}
      </Link>
    );
  }

  return (
    <BaseButton
      className={className}
      {...props}
    />
  );
}