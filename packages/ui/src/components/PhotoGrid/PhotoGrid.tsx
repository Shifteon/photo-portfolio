import Image from "next/image";
import { Photo } from "@portfolio/types";

interface PhotoGridProps {
  photos: Photo[];
  targetColumns?: number; // Default to 3 for sorting optimization
}

function isNullish(value: any): value is null | undefined {
  return value === null || value === undefined;
}

export function PhotoGrid({ photos, targetColumns = 3 }: PhotoGridProps) {
  // 1. Sort by order if present
  const sortedPhotos = [...photos].sort((a, b) => {
    if (!isNullish(a.order) && !isNullish(b.order)) {
      return a.order - b.order;
    }
    return 0; // Keep original order if no specific order
  });

  // 2. Simulate column distribution to balance heights
  // We track the current height of each column
  const columnHeights = new Array(targetColumns).fill(0);
  const columns: Photo[][] = Array.from({ length: targetColumns }, () => []);

  sortedPhotos.forEach((photo) => {
    // Determine the aspect ratio height (height relative to a width of 1)
    // If we don't have dimensions, assume square (1)
    const ratioHeight =
      photo.width && photo.height ? photo.height / photo.width : 1;

    // Find the shortest column
    let minHeight = columnHeights[0];
    let minIndex = 0;

    for (let i = 1; i < targetColumns; i++) {
      if (columnHeights[i] < minHeight) {
        minHeight = columnHeights[i];
        minIndex = i;
      }
    }

    // Add photo to the shortest column
    columns[minIndex].push(photo);
    columnHeights[minIndex] += ratioHeight;
  });

  // 3. Flatten columns: [Col1...], [Col2...] to order them for CSS Columns (Down then Right)
  const reorderedPhotos = columns.flat();

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
      {reorderedPhotos.map((photo) => (
        <div key={photo.id} className="break-inside-avoid relative mb-4">
          <Image
            src={photo.thumbnailPath}
            alt={photo.title}
            width={photo.width || 800} // fallback width if null
            height={photo.height || 600} // fallback height if null
            className="w-full h-auto rounded-lg object-contain bg-gray-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      ))}
    </div>
  );
}
