import { useEffect } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { IFormData, ISelectProps } from '../Form-interfaces';
import './Select.scss';

export default function FormSelect(props: UseControllerProps<IFormData> & ISelectProps) {
  const { field } = useController(props);
  const { clearErrors, getValues } = useFormContext();

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  const options = props.options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <select
      className="form-box__location-input"
      name={field.name}
      onChange={field.onChange}
      value={field.value}
      data-testid={'select-input'}
    >
      <option value="">Choose origin</option>
      {options}
    </select>
  );
}
