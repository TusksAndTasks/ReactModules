import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData } from '../Form-interfaces';
import './Checkbox.scss';

export default function FormCheckbox(props: UseControllerProps<IFormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  const [checkBoxValue, setCheckBoxValue] = useState('');

  function changeCheckBoxValue() {
    const value = checkBoxValue ? '' : 'Checked';
    field.onChange(value);
    setCheckBoxValue(field.value);
  }

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <input
      type="checkbox"
      onChange={changeCheckBoxValue}
      name={field.name}
      value={checkBoxValue}
      checked={field.value.length != 0}
      className="form-box__open-input"
      data-testid="open-input"
    />
  );
}
