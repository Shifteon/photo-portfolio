import { ComponentProps } from 'react';
import { Form as BaseForm } from '@base-ui-components/react/form';
import InputField from './Fields/InputField';

export function Form({ children, ...props }: ComponentProps<typeof BaseForm>) {
  return (
    <BaseForm className="flex flex-col gap-6 w-full" {...props}>
      {children}
    </BaseForm>
  );
}

Form.Field = InputField;