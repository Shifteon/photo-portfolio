'use client';

import React from 'react';

export interface NavigationRailItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NavigationRailItem = ({
  icon,
  label,
  active = false,
  onClick,
  className = '',
}: NavigationRailItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`group flex flex-col items-center gap-1 min-h-[56px] w-full px-2 cursor-pointer border-none bg-transparent ${className}`}
    >
      <div
        className={`
          flex items-center justify-center w-14 h-8 rounded-full transition-colors duration-200
          ${active
            ? 'bg-secondary-container text-on-secondary-container'
            : 'text-on-surface-variant group-hover:bg-surface-container-high'
          }
        `}
      >
        {icon}
      </div>
      <span
        className={`
          text-xs font-medium truncate w-full text-center transition-colors duration-200
          ${active ? 'text-on-surface' : 'text-on-surface-variant'}
        `}
      >
        {label}
      </span>
    </button>
  );
};
