import React, { useEffect, useState } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { FormData } from '../Form';
import './Switcher.scss';

export default function FormSwitcher(props: UseControllerProps<FormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  const [switchValue, setSwitchValue] = useState('Male');

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <label className="switcher">
      <input
        className="switch"
        type="checkbox"
        onChange={() => {
          const gender = switchValue === 'Male' ? 'Female' : 'Male';
          field.onChange(gender);
          setSwitchValue(field.value);
        }}
        checked={field.value === 'Female'}
        name={field.name}
        data-testid="switcher"
      />
      <span className="slider"></span>
    </label>
  );
}
