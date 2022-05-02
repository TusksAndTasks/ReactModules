import React, { useContext } from 'react';
import FormCheckbox from './checkbox/Checkbox';
import FormDateInput from './date-input/Date-input';
import FormFileUpload from './file-upload/File-upload';
import FormInput from './input/Input';
import Minicard from './minicard/Minicard';
import FormSelect from './select/Select';
import FormSwitcher from './switcher/Switcher';
import './Form.scss';
import { SubmitHandler, FormProvider, UseFormReturn } from 'react-hook-form';
import { FormDataContext, IContextList, ListDataContext } from '../../App';

export default function Form() {
  const formMethods = useContext(FormDataContext) as UseFormReturn<FormData>;
  const { dispatchListState, listState } = useContext(ListDataContext) as IContextList;

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

  const handleSubmitForm: SubmitHandler<FormData> = (data: FormData) => {
    dispatchListState({ type: 'addCard', payload: data });
  };

  return (
    <div className="form-container">
      <FormProvider {...formMethods}>
        <form className="form-box" onSubmit={formMethods.handleSubmit(handleSubmitForm)}>
          <div className="form-box__name">
            <FormInput control={formMethods.control} name="name" rules={ruleList.name} />
            {formMethods.formState.errors.name && (
              <label htmlFor="name" className="form-box__name-label" data-testid="name">
                {formMethods.formState.errors.name.message}
              </label>
            )}
          </div>
          <div className="form-box__date">
            <FormDateInput control={formMethods.control} name="date" rules={ruleList.date} />
            {formMethods.formState.errors.date && (
              <label htmlFor="date" className="form-box__date-label" data-testid="date">
                {formMethods.formState.errors.date.message}
              </label>
            )}
          </div>
          <div className="form-box__location">
            <FormSelect control={formMethods.control} name="location" rules={ruleList.location} />
            {formMethods.formState.errors.location && (
              <label htmlFor="location" className="form-box__location-label" data-testid="location">
                {formMethods.formState.errors.location.message}
              </label>
            )}
          </div>
          <div className="form-box__open">
            <h3>Confirm character creation:</h3>
            <FormCheckbox control={formMethods.control} name="confirm" rules={ruleList.confirm} />
            {formMethods.formState.errors.confirm && (
              <label htmlFor="openProject" className="form-box__open-label" data-testid="open">
                {formMethods.formState.errors.confirm.message}
              </label>
            )}
          </div>
          <div className="form-box__switch">
            <h3>Choose character&apos;s gender:</h3>
            <div className="form-box__switch-wrap">
              <p>Male</p>
              <FormSwitcher control={formMethods.control} name="gender" />
              <p>Female</p>
            </div>
          </div>
          <div className="form-box__file">
            <FormFileUpload control={formMethods.control} name="file" rules={ruleList.file} />
            {formMethods.formState.errors.file && (
              <label htmlFor="file" className="form-box__file-label" data-testid="file">
                {formMethods.formState.errors.file.message}
              </label>
            )}
          </div>
          <input
            type="submit"
            value="Create character"
            data-testid={'submit-btn'}
            className="form-box__submit"
          />
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
