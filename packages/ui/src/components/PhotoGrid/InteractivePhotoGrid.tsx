"use client";

import { useState } from "react";
import { Photo } from "@portfolio/types";
import { MasonryGrid } from "./MasonryGrid";

interface InteractivePhotoGridProps {
  photos: Photo[];
  targetColumns?: number;
  selectedIds?: number[];
  onSelectionChange?: (selectedIds: number[]) => void;
  limit?: number;
}

export function InteractivePhotoGrid({
  photos,
  targetColumns = 3,
  selectedIds,
  onSelectionChange,
  limit,
}: InteractivePhotoGridProps) {
  const [internalSelectedIds, setInternalSelectedIds] = useState<number[]>([]);

  const currentSelectedIds = selectedIds ?? internalSelectedIds;

  const handlePhotoClick = (photo: Photo) => {
    let newSelectedIds: number[];
    if (currentSelectedIds.includes(photo.id)) {
      newSelectedIds = currentSelectedIds.filter((id) => id !== photo.id);
    } else {
      if (limit && currentSelectedIds.length >= limit) {
        newSelectedIds = [photo.id];
      } else {
        newSelectedIds = [...currentSelectedIds, photo.id];
      }
    }

    if (onSelectionChange) {
      onSelectionChange(newSelectedIds);
    }

    if (selectedIds === undefined) {
      setInternalSelectedIds(newSelectedIds);
    }
  };

  return (
    <MasonryGrid
      photos={photos}
      targetColumns={targetColumns}
      selectedIds={currentSelectedIds}
      onPhotoClick={handlePhotoClick}
    />
  );
}
