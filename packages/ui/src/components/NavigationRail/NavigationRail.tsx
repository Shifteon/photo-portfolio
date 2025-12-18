import React from 'react';

export interface NavigationRailProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const NavigationRail = ({
  children,
  className = '',
  header,
  footer,
}: NavigationRailProps) => {
  return (
    <nav
      className={`bg-surface-container w-20 h-full flex flex-col items-center py-4 gap-4 ${className}`}
    >
      {header && <div className="mb-4">{header}</div>}
      <div className="flex flex-col items-center gap-3 w-full flex-1">
        {children}
      </div>
      {footer && <div className="mt-auto">{footer}</div>}
    </nav>
  );
};
