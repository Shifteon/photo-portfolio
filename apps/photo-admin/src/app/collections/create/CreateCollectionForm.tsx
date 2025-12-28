'use client';

import { Button, Form } from "@portfolio/ui";
import { useActionState } from "react";
import { createCollection, ActionState } from "../../actions/createCollection";
import { Photo } from "@portfolio/types";
import { CollectionPhotoSelector } from "./CollectionPhotoSelector";

const initialState: ActionState = {
  success: false,
  message: '',
};

interface CreateCollectionFormProps {
  photos: Photo[];
}

export default function CreateCollectionForm({ photos }: CreateCollectionFormProps) {
  const [state, formAction, isPending] = useActionState(createCollection, initialState);

  return (
    <Form action={formAction}>
      <div className="space-y-4">
        <Form.Field
          name="name"
          label="Name"
          type="text"
          error={state.errors?.name?.[0]}
        />
        <Form.Field
          name="slug"
          label="Slug"
          type="text"
          error={state.errors?.slug?.[0]}
        />
        <Form.Field
          name="order"
          label="Order"
          type="number"
          error={state.errors?.order?.[0]}
        />
      </div>

      <div className="border-t pt-4 space-y-2">
        <CollectionPhotoSelector photos={photos} inputName="coverPhotoId" limit={1} label="Cover Photo" />
        <CollectionPhotoSelector photos={photos} inputName="photoIds" label="Photos" />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Collection'}
        </Button>
      </div>
      {state.message && (
        <p style={{ color: state.success ? 'green' : 'var(--color-error)' }}>
          {state.message}
        </p>
      )}
    </Form>
  );
}
