import { Photo } from "@portfolio/types";

function isNullish(value: any): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Sorts/reorders photos to optimize for a CSS multi-column masonry layout.
 * It simulates filling columns to keep heights balanced, then flattens them
 * so that they appear in the correct visual order when using CSS columns.
 */
export function sortPhotosForMasonry(photos: Photo[], targetColumns: number): Photo[] {
  // 1. Sort by order if present
  const sortedPhotos = [...photos].sort((a, b) => {
    if (!isNullish(a.order) && !isNullish(b.order)) {
      return a.order! - b.order!;
    }
    return 0; // Keep original order if no specific order
  });

  // 2. Simulate column distribution to balance heights
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
  return columns.flat();
}
