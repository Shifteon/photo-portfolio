import { Dialog as BaseDialog } from '@base-ui-components/react/dialog';
import { ComponentProps, Ref, forwardRef } from 'react';

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

function Root(props: ComponentProps<typeof BaseDialog.Root>) {
  return <BaseDialog.Root {...props} />;
}

function Trigger({ className, ...props }: ComponentProps<typeof BaseDialog.Trigger> & { className?: string }) {
  return (
    <BaseDialog.Trigger
      className={cn(
        'cursor-pointer',
        'bg-primary text-on-primary px-4 py-2 rounded-full hover:brightness-90 transition-all font-medium text-sm',
        className
      )}
      {...props}
    />
  );
}

function Portal(props: ComponentProps<typeof BaseDialog.Portal>) {
  return <BaseDialog.Portal {...props} />;
}

function Backdrop({ className, ...props }: ComponentProps<typeof BaseDialog.Backdrop> & { className?: string }) {
  return ( // Use scrim for backdrop
    <BaseDialog.Backdrop
      className={cn(
        'fixed inset-0 z-50 bg-scrim/40 transition-all duration-300',
        'data-[starting-style]:opacity-0',
        'data-[ending-style]:opacity-0',
        className
      )}
      {...props}
    />
  );
}

function Viewport({ className, ...props }: ComponentProps<typeof BaseDialog.Viewport> & { className?: string }) {
  return (
    <BaseDialog.Viewport
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4',
        className
      )}
      {...props}
    />
  );
}

const Popup = forwardRef(function Popup(
  { className, ...props }: ComponentProps<typeof BaseDialog.Popup> & { className?: string },
  ref: Ref<HTMLDivElement>
) {
  return (
    <BaseDialog.Popup
      ref={ref}
      className={cn(
        'relative w-full rounded-[28px] bg-surface-container-high p-6 shadow-xl transition-all duration-300',
        'w-full h-[90vh] flex flex-col p-0 overflow-hidden',
        'text-on-surface',
        'data-[starting-style]:scale-90 data-[starting-style]:opacity-0',
        'data-[ending-style]:scale-90 data-[ending-style]:opacity-0',
        className
      )}
      {...props}
    />
  );
});

function Title({ className, ...props }: ComponentProps<typeof BaseDialog.Title> & { className?: string }) {
  return (
    <BaseDialog.Title
      className={cn('text-2xl font-normal leading-8 mb-4 text-on-surface', className)}
      {...props}
    />
  );
}

function Description({ className, ...props }: ComponentProps<typeof BaseDialog.Description> & { className?: string }) {
  return (
    <BaseDialog.Description
      className={cn('text-base text-on-surface-variant mb-6', className)}
      {...props}
    />
  );
}

function Close({ className, ...props }: ComponentProps<typeof BaseDialog.Close> & { className?: string }) {
  return <BaseDialog.Close className={cn(
    'cursor-pointer text-primary hover:bg-primary/10 rounded-full transition-colors p-2 pl-4 pr-4',
    className
  )} {...props} />;
}

export const Dialog = {
  Root,
  Trigger,
  Portal,
  Backdrop,
  Viewport,
  Popup,
  Title,
  Description,
  Close,
};
