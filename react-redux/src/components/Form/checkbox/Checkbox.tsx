import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData } from '../Form-interfaces';
import './Checkbox.scss';

export default function FormCheckbox(props: UseControllerProps<IFormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  const [checkBoxValue, setCheckBoxValue] = useState(field.value);

  function changeCheckBoxValue() {
    const value = checkBoxValue ? '' : 'Checked';
    field.onChange(value);
    setCheckBoxValue(field.value);
  }

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <>
      <input
        type="checkbox"
        onClick={changeCheckBoxValue}
        name={field.name}
        value={checkBoxValue}
        defaultChecked={!!checkBoxValue}
        className="form-box__open-input"
        data-testid="open-input"
      />
      <label htmlFor="openProject" className="form-box__open-custom">
        <svg viewBox="0, 0, 50, 50">
          <path d="M5 30 L 20 45 L 45 5" />
        </svg>
      </label>
    </>
  );
}
