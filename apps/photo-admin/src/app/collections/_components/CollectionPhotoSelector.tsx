'use client';

import { Photo } from "@portfolio/types";
import { InteractivePhotoGrid, Dialog, Form } from "@portfolio/ui";
import { useState } from "react";

interface CollectionPhotoSelectorProps {
  photos: Photo[];
  label: string;
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  limit?: number;
}

export function CollectionPhotoSelector({
  photos,
  label,
  selectedIds,
  onSelectionChange,
  limit = undefined
}: CollectionPhotoSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-surface-container p-4 rounded-lg border border-outline-variant">
        <div>
          <h3 className="text-lg font-medium text-on-surface">{label}</h3>
          <p className="text-sm text-on-surface-variant">{selectedIds.length} photo{selectedIds.length !== 1 ? 's' : ''} selected</p>
        </div>

        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger>
            {limit === 1 ? 'Select Photo' : 'Select Photos'}
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop />
            <Dialog.Viewport>
              <Dialog.Popup>
                <div className="p-2 border-b border-outline-variant flex justify-between items-center shrink-0">
                  <Dialog.Title>Select Photos</Dialog.Title>
                </div>

                <div className="flex-1 overflow-y-auto p-6 min-h-0">
                  <InteractivePhotoGrid
                    photos={photos}
                    selectedIds={selectedIds}
                    onSelectionChange={onSelectionChange}
                    limit={limit}
                    targetColumns={4}
                  />
                </div>

                <div className="p-4 flex justify-end shrink-0">
                  <Dialog.Close>
                    Done
                  </Dialog.Close>
                </div>
              </Dialog.Popup>
            </Dialog.Viewport>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
