'use client';

import { Button, Form } from "@portfolio/ui";
import { useActionState } from "react";
import { createPhoto, ActionState } from "../../actions/uploadPhoto";

const initialState: ActionState = {
  success: false,
  message: '',
};

export default function UploadForm() {
  const [state, formAction, isPending] = useActionState(createPhoto, initialState);

  return (
    <Form action={formAction}>
      <Form.Field
        name="title"
        label="Title"
        type="text"
        error={state.errors?.title?.[0]}
      />
      <Form.Field
        name="file"
        label="File"
        type="file"
        error={state.errors?.file?.[0]}
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Uploading...' : 'Submit'}
      </Button>
      {state.message && (
        <p style={{ color: state.success ? 'green' : 'var(--color-error)' }}>
          {state.message}
        </p>
      )}
    </Form>
  );
}