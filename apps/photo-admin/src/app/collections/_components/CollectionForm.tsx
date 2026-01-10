'use client';

import { Button, Form, MasonryGrid, SortableList } from "@portfolio/ui";
import { useActionState, useState, useMemo } from "react";
import { Photo, Collection } from "@portfolio/types";
import { CollectionPhotoSelector } from "./CollectionPhotoSelector";
import { PhotoSortableItem } from "./PhotoSortableItem";

interface ActionState {
  success: boolean;
  message?: string;
  errors?: any;
  [key: string]: any;
}

const initialState: ActionState = {
  success: false,
  message: '',
};

interface CollectionFormProps {
  photos: Photo[];
  initialData?: Collection;
  action: (state: ActionState, payload: FormData) => Promise<ActionState>;
}

export default function CollectionForm({ photos, initialData, action }: CollectionFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [step, setStep] = useState<1 | 2>(1);

  // Initialize state from initialData if available
  const [coverPhotoId, setCoverPhotoId] = useState<number[]>(
    initialData?.coverPhoto ? [initialData.coverPhoto.id] : []
  );

  const [selectedPhotos, setSelectedPhotos] = useState<Photo[]>(
    initialData?.photos || []
  );

  // Derive selected IDs for the selector component
  const selectedPhotoIds = useMemo(() => selectedPhotos.map(p => p.id), [selectedPhotos]);

  const handlePhotoSelection = (newIds: number[]) => {
    // Find photos that are newly selected
    const addedIds = newIds.filter(id => !selectedPhotoIds.includes(id));
    const addedPhotos = addedIds.map(id => photos.find(p => p.id === id)).filter(Boolean) as Photo[];

    // Filter out photos that are no longer selected, preserving order of remaining ones
    const remainingPhotos = selectedPhotos.filter(p => newIds.includes(p.id));

    // Append new photos to the end
    setSelectedPhotos([...remainingPhotos, ...addedPhotos]);
  };

  const handleReorder = (newPhotos: Photo[]) => {
    setSelectedPhotos(newPhotos);
  };

  const handleRemovePhoto = (id: number) => {
    setSelectedPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="w-full">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
          <span className={step === 1 ? "text-primary font-medium" : ""}>Step 1: Details</span>
          <span>&rarr;</span>
          <span className={step === 2 ? "text-primary font-medium" : ""}>Step 2: Photos</span>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center mx-auto">
        <Form action={formAction}>
          {/* Step 1: Details */}
          <div className={step === 1 ? 'space-y-6 w-full' : 'hidden'}>
            <div className="space-y-4 w-full">
              <Form.Field
                name="name"
                label="Name"
                type="text"
                defaultValue={initialData?.name}
                error={state.errors?.name?.[0]}
                required
              />
              <Form.Field
                name="slug"
                label="Slug"
                type="text"
                defaultValue={initialData?.slug}
                error={state.errors?.slug?.[0]}
                required
              />
              <Form.Field
                name="order"
                label="Order"
                type="number"
                defaultValue={initialData?.order}
                error={state.errors?.order?.[0]}
              />
            </div>

            <div className="pt-4 w-full">
              <CollectionPhotoSelector
                photos={photos}
                label="Cover Photo"
                selectedIds={coverPhotoId}
                onSelectionChange={setCoverPhotoId}
                limit={1}
              />
              {/* Hidden input for cover photo */}
              {coverPhotoId.map(id => (
                <input key="cover-photo" type="hidden" name="coverPhotoId" value={id} />
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="button" onClick={() => setStep(2)}>
                Next
              </Button>
            </div>
          </div>

          {/* Step 2: Photos */}
          <div className={step === 2 ? 'space-y-6' : 'hidden'}>
            <div className="space-y-4">
              <CollectionPhotoSelector
                photos={photos}
                label="Add Photos"
                selectedIds={selectedPhotoIds}
                onSelectionChange={handlePhotoSelection}
              />

              {selectedPhotos.length > 0 && (
                <div className="mt-4 w-full">
                  <h3 className="text-sm font-medium text-on-surface mb-2">
                    Selected Photos ({selectedPhotos.length})
                  </h3>
                  <div className="grid grid-cols-[1fr_2fr] gap-4 w-full">
                    <div>
                      <SortableList
                        items={selectedPhotos}
                        onReorder={handleReorder}
                        renderItem={(photo, { dragHandleProps, isDragging }) => (
                          <PhotoSortableItem
                            photo={photo}
                            onRemove={handleRemovePhoto}
                            dragHandleProps={dragHandleProps}
                            isDragging={isDragging}
                          />
                        )}
                      />
                    </div>
                    <div>
                      <MasonryGrid
                        photos={selectedPhotos}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hidden inputs for ordered photos */}
            {selectedPhotos.map((photo) => (
              <input key={photo.id} type="hidden" name="photoIds" value={photo.id} />
            ))}

            <div className="flex justify-between pt-4 border-t border-outline-variant">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (initialData ? 'Updating...' : 'Creating...') : (initialData ? 'Update Collection' : 'Create Collection')}
              </Button>
            </div>
          </div>

          {state.message && (
            <p className={`mt-4 ${state.success ? 'text-green-600' : 'text-error'}`}>
              {state.message}
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
