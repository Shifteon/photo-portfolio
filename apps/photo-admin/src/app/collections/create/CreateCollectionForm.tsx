'use client';

import { Button, Form } from "@portfolio/ui";
import { useActionState } from "react";
import { createCollection, ActionState } from "../../actions/createCollection";

const initialState: ActionState = {
  success: false,
  message: '',
};

export default function CreateCollectionForm() {
  const [state, formAction, isPending] = useActionState(createCollection, initialState);

  return (
    <Form action={formAction}>
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
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Collection'}
      </Button>
      {state.message && (
        <p style={{ color: state.success ? 'green' : 'var(--color-error)' }}>
          {state.message}
        </p>
      )}
    </Form>
  );
}
