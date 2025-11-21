import React from 'react';
import { View } from 'react-native';
import { FormProvider, UseFormReturn, FieldValues } from 'react-hook-form';

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit?: (data: T) => void;
  children: React.ReactNode;
  style?: any;
}

export function Form<T extends FieldValues>({
  form,
  children,
  style,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <View style={style}>{children}</View>
    </FormProvider>
  );
}
