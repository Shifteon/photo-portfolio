import { Photo } from "@portfolio/types";
import { sortPhotosForMasonry } from "./utils";
import { PhotoGridItem } from "./PhotoGridItem";

interface MasonryGridProps {
  photos: Photo[];
  targetColumns?: number;
  selectedIds?: number[];
  onPhotoClick?: (photo: Photo) => void;
}

export function MasonryGrid({
  photos,
  targetColumns = 3,
  selectedIds = [],
  onPhotoClick,
}: MasonryGridProps) {
  const reorderedPhotos = sortPhotosForMasonry(photos, targetColumns);

  // Tailwind cannot generate classes dynamically at runtime, so we need to map them explicitly
  const columnClassNames: Record<number, string> = {
    1: 'columns-1',
    2: 'columns-1 md:columns-2 lg:columns-2',
    3: 'columns-1 md:columns-2 lg:columns-3',
    4: 'columns-2 md:columns-3 lg:columns-4',
    5: 'columns-3 md:columns-4 lg:columns-5',
    6: 'columns-4 md:columns-5 lg:columns-6',
  };

  const columnsClassName = columnClassNames[targetColumns] || columnClassNames[3];

  return (
    <div className={`${columnsClassName} gap-4 space-y-4`}>
      {reorderedPhotos.map((photo) => (
        <PhotoGridItem
          key={photo.id}
          photo={photo}
          selected={selectedIds.includes(photo.id)}
          onClick={onPhotoClick}
        />
      ))}
    </div>
  );
}
