import React, { useEffect, useState } from 'react';
import FormCheckbox from './checkbox/Checkbox';
import FormDateInput from './date-input/Date-input';
import FormFileUpload from './file-upload/File-upload';
import FormInput from './input/Input';
import Minicard from './minicard/Minicard';
import FormSelect from './select/Select';
import FormSwitcher from './switcher/Switcher';
import './Form.scss';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

export default function Form() {
  const methods = useForm<FormData>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      name: '',
      date: '',
      location: '',
      confirm: '',
      gender: 'Male',
      file: '',
    },
  });

  const ruleList = {
    name: {
      required: 'You must choose a name!',
      validate: (words: string) => {
        return words.trimEnd().split(' ').length <= 2 ? true : "You're using too many words!";
      },
    },
    date: {
      required: 'You must set a date of birth!',
    },
    location: {
      required: 'You must set an origin location!',
    },
    confirm: {
      required: 'You must confirm charachter creation!',
    },
    file: {
      required: 'You must set a picture!',
    },
  };

  const [listState, setListState] = useState([] as Array<FormData>);

  const handleSubmitForm: SubmitHandler<FormData> = (data: FormData) => {
    setListState((prevState) => [...prevState, data]);
  };

  useEffect(() => {
    methods.reset({ name: '', date: '', location: '', confirm: '', gender: 'Male', file: '' });
  }, [methods.formState.isSubmitSuccessful]);

  return (
    <div className="form-container">
      <FormProvider {...methods}>
        <form className="form-box" onSubmit={methods.handleSubmit(handleSubmitForm)}>
          <div className="form-box__name">
            <FormInput control={methods.control} name="name" rules={ruleList.name} />
            {methods.formState.errors.name && (
              <label htmlFor="name" className="form-box__name-label" data-testid="name">
                {methods.formState.errors.name.message}
              </label>
            )}
          </div>
          <div className="form-box__date">
            <FormDateInput control={methods.control} name="date" rules={ruleList.date} />
            {methods.formState.errors.date && (
              <label htmlFor="date" className="form-box__date-label" data-testid="date">
                {methods.formState.errors.date.message}
              </label>
            )}
          </div>
          <div className="form-box__location">
            <FormSelect control={methods.control} name="location" rules={ruleList.location} />
            {methods.formState.errors.location && (
              <label htmlFor="location" className="form-box__location-label" data-testid="location">
                {methods.formState.errors.location.message}
              </label>
            )}
          </div>
          <div className="form-box__open">
            <h3>Confirm character creation:</h3>
            <FormCheckbox control={methods.control} name="confirm" rules={ruleList.confirm} />
            {methods.formState.errors.confirm && (
              <label htmlFor="openProject" className="form-box__open-label" data-testid="open">
                {methods.formState.errors.confirm.message}
              </label>
            )}
          </div>
          <div className="form-box__switch">
            <h3>Choose character&apos;s gender:</h3>
            <div className="form-box__switch-wrap">
              <p>Male</p>
              <FormSwitcher control={methods.control} name="gender" />
              <p>Female</p>
            </div>
          </div>
          <div className="form-box__file">
            <FormFileUpload control={methods.control} name="file" rules={ruleList.file} />
            {methods.formState.errors.file && (
              <label htmlFor="file" className="form-box__file-label" data-testid="file">
                {methods.formState.errors.file.message}
              </label>
            )}
          </div>
          <input type="submit" value="Create character" data-testid={'submit-btn'} />
        </form>
      </FormProvider>
      {
        <div className="cards-box">
          {listState.map((cardData, index) => (
            <Minicard key={cardData.file} cardData={cardData} testid={`card-${index}`} />
          ))}
        </div>
      }
    </div>
  );
}

export interface FormData {
  name: string;
  date: string;
  location: string;
  confirm: string;
  gender: string;
  file: string;
}
