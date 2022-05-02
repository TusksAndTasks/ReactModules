import React, { useEffect } from 'react';
import { useController, UseControllerProps, useFormContext } from 'react-hook-form';
import { FormData } from '../Form';
import './File.scss';

export default function FormFileUpload(props: UseControllerProps<FormData>) {
  const { field } = useController(props);
  const { formState, clearErrors, getValues } = useFormContext();
  const refer = React.createRef() as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    clearErrors(field.name);
  }, [getValues(field.name)]);

  useEffect(() => {
    (refer.current as HTMLInputElement).value = '';
  }, [formState.isSubmitSuccessful]);

  return (
    <div className="form-box__file-wrapper">
      <label htmlFor="file" className="form-box__file-inner-label">
        {getValues(field.name) ? (
          <button type="button">Change image</button>
        ) : (
          <button type="button">Select Image</button>
        )}
        {getValues(field.name) && (
          <img src={getValues(field.name)} className="form-box__file-image" />
        )}
      </label>

      <input
        type="file"
        ref={refer}
        onChange={(event) => {
          const url = URL.createObjectURL(
            ((event.target as HTMLInputElement).files as FileList)[0]
          );
          field.onChange(url);
        }}
        name={field.name}
        className="form-box__file-input"
        data-testid="file-input"
      />
    </div>
  );
}
