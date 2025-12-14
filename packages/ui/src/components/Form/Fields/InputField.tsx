'use client';

import { Field } from '@base-ui-components/react/field';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'file';

export interface InputFieldProps {
  label: string;
  name: string;
  type: InputType;
  description?: string;
  error?: string;
}

export default function InputField({ label, name, type, description, error }: InputFieldProps) {
  return (
    <Field.Root className="flex flex-col gap-1 w-full relative">
      <Field.Label className="text-sm font-medium text-surface-on-variant mb-1 ml-1">{label}</Field.Label>
      <Field.Control
        type={type}
        name={name}
        className="w-full bg-transparent border border-outline rounded-[4px] px-4 py-3 text-surface-on placeholder:text-surface-on-variant/50 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors data-[invalid]:border-error data-[invalid]:text-error"
      />
      {description && <Field.Description className="text-xs text-surface-on-variant ml-4">{description}</Field.Description>}
      {error && <Field.Error className="text-xs text-error ml-4 mt-1">{error}</Field.Error>}
    </Field.Root>
  );
}