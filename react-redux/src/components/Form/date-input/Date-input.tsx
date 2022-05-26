import React, { useEffect } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData } from '../Form-interfaces';
import './Date.scss';

export default function FormDateInput(props: UseControllerProps<IFormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <input
      type="date"
      placeholder="Enter date of birth"
      min="2022-01-01"
      max="2052-01-01"
      onChange={field.onChange}
      value={field.value}
      name={props.name}
      className="form-box__date-input"
      data-testid="date-input"
    />
  );
}
