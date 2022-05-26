import React, { useEffect } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData } from '../Form-interfaces';
import './input.scss';

export default function FormInput(props: UseControllerProps<IFormData>) {
  const { clearErrors, getValues } = useFormContext();
  const { field } = useController(props);

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <input
      type="input"
      placeholder="Enter character's name"
      name={props.name}
      className="form-box__name-input"
      value={field.value}
      onChange={field.onChange}
    />
  );
}
