import { useContext } from 'react';
import FormCheckbox from './checkbox/Checkbox';
import FormDateInput from './date-input/Date-input';
import FormFileUpload from './file-upload/File-upload';
import FormInput from './input/Input';
import Minicard from './minicard/Minicard';
import FormSelect from './select/Select';
import FormSwitcher from './switcher/Switcher';
import './Form.scss';
import { SubmitHandler, FormProvider, UseFormReturn } from 'react-hook-form';
import { FormDataContext } from '../../App';
import { AppDispatch, IState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../redux/Slices/formListSlice';
import { IFormData } from './Form-interfaces';

export default function Form() {
  const formMethods = useContext(FormDataContext) as UseFormReturn<IFormData>;
  const dispatch = useDispatch() as AppDispatch;
  const { cards } = useSelector((state: IState) => state.formList);

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

  const handleSubmitForm: SubmitHandler<IFormData> = (data: IFormData) => {
    dispatch(addCard(data));
  };
  const { errors } = formMethods.formState;
  const locationsList = ['Earth', 'Moon', 'Andromeda', 'Hell'] as string[];
  const { control, handleSubmit } = formMethods;
  const { name, date, location, confirm, file } = ruleList;

  return (
    <div className="form-container">
      <FormProvider {...formMethods}>
        <form className="form-box" onSubmit={handleSubmit(handleSubmitForm)}>
          <div className="form-box__name">
            <FormInput control={control} name="name" rules={name} />
            {errors.name && (
              <label htmlFor="name" className="form-box__name-label" data-testid="name">
                {errors.name.message}
              </label>
            )}
          </div>
          <div className="form-box__date">
            <FormDateInput control={control} name="date" rules={date} />
            {errors.date && (
              <label htmlFor="date" className="form-box__date-label" data-testid="date">
                {errors.date.message}
              </label>
            )}
          </div>
          <div className="form-box__location">
            <FormSelect
              control={control}
              name="location"
              rules={location}
              options={locationsList}
            />
            {errors.location && (
              <label htmlFor="location" className="form-box__location-label" data-testid="location">
                {errors.location.message}
              </label>
            )}
          </div>
          <div className="form-box__open">
            <h3>Confirm character creation:</h3>
            <FormCheckbox control={control} name="confirm" rules={confirm} />
            {errors.confirm && (
              <label htmlFor="openProject" className="form-box__open-label" data-testid="open">
                {errors.confirm.message}
              </label>
            )}
          </div>
          <div className="form-box__switch">
            <h3>Choose character&apos;s gender:</h3>
            <div className="form-box__switch-wrap">
              <p>Male</p>
              <FormSwitcher control={control} name="gender" />
              <p>Female</p>
            </div>
          </div>
          <div className="form-box__file">
            <FormFileUpload control={control} name="file" rules={file} />
            {errors.file && (
              <label htmlFor="file" className="form-box__file-label" data-testid="file">
                {errors.file.message}
              </label>
            )}
          </div>
          <input
            type="submit"
            value="Create character"
            data-testid="submit-btn"
            className="form-box__submit"
          />
        </form>
      </FormProvider>
      {
        <div className="cards-box">
          {cards.map((cardData, index) => {
            return <Minicard key={cardData.file} cardData={cardData} testid={`card-${index}`} />;
          })}
        </div>
      }
    </div>
  );
}
