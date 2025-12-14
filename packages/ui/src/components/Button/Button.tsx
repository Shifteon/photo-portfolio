'use client';

import { Button as BaseButton } from '@base-ui-components/react/button';

export const Button = (props: React.ComponentProps<typeof BaseButton>) => {
  return (
    <BaseButton
      className="bg-primary cursor-pointer text-primary-on rounded-full px-6 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
      {...props}
    />
  );
}