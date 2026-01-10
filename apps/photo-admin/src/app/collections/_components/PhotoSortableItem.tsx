'use client';

import { Photo } from "@portfolio/types";
import { GripVertical, X } from "lucide-react";
import Image from "next/image";

interface PhotoSortableItemProps {
  photo: Photo;
  onRemove: (id: number) => void;
  dragHandleProps?: any;
  isDragging?: boolean;
}

export function PhotoSortableItem({
  photo,
  onRemove,
  dragHandleProps,
  isDragging,
}: PhotoSortableItemProps) {
  return (
    <div
      className={`flex items-center gap-4 p-2 bg-surface border border-outline-variant rounded-lg group ${isDragging ? 'opacity-50 border-primary' : ''
        }`}
    >
      <div className="relative w-[60px] h-[60px] rounded-md overflow-hidden bg-surface-variant">
        <Image
          src={photo.thumbnailPath}
          alt={photo.title}
          width={80}
          height={80}
          className="object-cover rounded-md overflow-hidden w-[60px] h-[60px]"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-on-surface truncate">
          {photo.title}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onRemove(photo.id)}
        className="p-2 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors cursor-pointer"
      >
        <X className="w-5 h-5" />
      </button>

      <div
        {...dragHandleProps}
        className="p-2 cursor-grab active:cursor-grabbing text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50 rounded-lg transition-colors touch-none"
      >
        <GripVertical className="w-5 h-5" />
      </div>
    </div>
  );
}
