import { Photo } from "@portfolio/types";
import { MasonryGrid } from "./MasonryGrid";

interface PhotoGridProps {
  photos: Photo[];
  targetColumns?: number; // Default to 3 for sorting optimization
}

export function PhotoGrid({ photos, targetColumns = 3 }: PhotoGridProps) {
  return <MasonryGrid photos={photos} targetColumns={targetColumns} />;
}
