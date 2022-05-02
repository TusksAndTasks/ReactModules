import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { FormData } from '../Form';
import './Checkbox.scss';

export default function FormCheckbox(props: UseControllerProps<FormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  const [checkBoxValue, setCheckBoxValue] = useState('');

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <input
      type="checkbox"
      onChange={() => {
        const value = checkBoxValue ? '' : 'Checked';
        field.onChange(value);
        setCheckBoxValue(field.value);
      }}
      name={field.name}
      value={checkBoxValue}
      checked={field.value.length != 0}
      className="form-box__open-input"
      data-testid="open-input"
    />
  );
}
