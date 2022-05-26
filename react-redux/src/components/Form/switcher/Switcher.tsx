import { useEffect, useState } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData } from '../Form-interfaces';
import './Switcher.scss';

export default function FormSwitcher(props: UseControllerProps<IFormData>) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  const [switchValue, setSwitchValue] = useState('Male');

  function changeCheckBoxValue() {
    const gender = switchValue === 'Male' ? 'Female' : 'Male';
    field.onChange(gender);
    setSwitchValue(field.value);
  }

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  return (
    <label className="switcher">
      <input
        className="switch"
        type="checkbox"
        onChange={changeCheckBoxValue}
        checked={field.value === 'Female'}
        name={field.name}
        data-testid="switcher"
      />
      <span className="slider"></span>
    </label>
  );
}
