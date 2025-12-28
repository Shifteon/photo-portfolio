'use client';

import { Button as BaseButton } from '@base-ui-components/react/button';
import Link from 'next/link';

type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  href?: string;
};

export const Button = ({ href, ...props }: ButtonProps) => {
  const className = "bg-primary cursor-pointer text-on-primary rounded-full px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm no-underline inline-flex";

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