import React, { useEffect } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { FormData } from '../Form';
import './Select.scss';

export default function FormSelect(props: UseControllerProps<FormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <select
      className="form-box__location-input"
      name={field.name}
      onChange={field.onChange}
      value={field.value}
      data-testid={'select-input'}
    >
      <option value="">Choose origin</option>
      <option value="Earth">Earth</option>
      <option value="Moon">Moon</option>
      <option value="Andromeda">Andromeda</option>
      <option value="Hell">Hell</option>
    </select>
  );
}
