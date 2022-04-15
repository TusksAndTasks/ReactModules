import React, { ChangeEvent } from 'react';
import FormCheckbox from './checkbox/Checkbox';
import FormDateInput from './date-input/Date-input';
import FormFileUpload from './file-upload/File-upload';
import { References, FormState } from './Form-interfaces';
import FormInput from './input/Input';
import Minicard from './minicard/Minicard';
import FormSelect from './select/Select';
import FormSwitcher from './switcher/Switcher';
import './Form.scss';

export default class Form extends React.Component<Record<string, unknown>, FormState> {
  nameRef: React.RefObject<HTMLInputElement>;
  dateRef: React.RefObject<HTMLInputElement>;
  locationRef: React.RefObject<HTMLSelectElement>;
  openProjectRef: React.RefObject<HTMLInputElement>;
  isCommercialRef: React.RefObject<HTMLInputElement>;
  fileRef: React.RefObject<HTMLInputElement>;
  referencePack: References;

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      formState: {
        name: '',
        date: '',
        location: '',
        openProject: false,
        isCommercial: false,
        file: '',
      },
      errorState: {
        nameError: '',
        dateError: '',
        locationError: '',
        openProjectError: '',
        fileError: '',
      },
      formsList: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.validateName = this.validateName.bind(this);
    this.validateDate = this.validateDate.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateSelect = this.validateSelect.bind(this);
    this.validateCheckbox = this.validateCheckbox.bind(this);
    this.validateFile = this.validateFile.bind(this);

    this.nameRef = React.createRef();
    this.dateRef = React.createRef();
    this.locationRef = React.createRef();
    this.openProjectRef = React.createRef();
    this.isCommercialRef = React.createRef();
    this.fileRef = React.createRef();

    this.referencePack = {
      nameRef: this.nameRef,
      dateRef: this.dateRef,
      locationRef: this.locationRef,
      openProjectRef: this.openProjectRef,
      isCommercialRef: this.isCommercialRef,
      fileRef: this.fileRef,
    };
  }

  handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        formState: {
          ...prevState.formState,
          [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
        },
        errorState: {
          ...prevState.errorState,
          [`${(event.target as HTMLInputElement).name}Error`]: '',
        },
      };
    });
  }

  handleCheck(event: ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        formState: {
          ...prevState.formState,
          [(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).checked,
        },
        errorState: {
          ...prevState.errorState,
          [`${(event.target as HTMLInputElement).name}Error`]: '',
        },
      };
    });
  }

  handleImage(event: ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        formState: {
          ...prevState.formState,
          [(event.target as HTMLInputElement).name]: URL.createObjectURL(
            ((this.fileRef.current as HTMLInputElement).files as FileList)[0]
          ),
        },
        errorState: {
          ...prevState.errorState,
          [`${(event.target as HTMLInputElement).name}Error`]: '',
        },
      };
    });
  }

  async validateName() {
    if (this.state.formState.name.split(' ').length === 2) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            nameError: '',
          },
        };
      });
    }
    if (this.state.formState.name.split(' ').length < 2) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            nameError: 'Вы должны указать имя и фамилию!',
          },
        };
      });
      (this.referencePack.nameRef.current as HTMLInputElement).classList.add('validationError');
    }
    if (this.state.formState.name.trimEnd().split(' ').length > 2) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            nameError: 'Вы указали слишком много слов!',
          },
        };
      });
      (this.referencePack.nameRef.current as HTMLInputElement).classList.add('validationError');
    }
  }

  async validateDate() {
    if (this.state.formState.date === '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            dateError: 'Вы должны указать дату проведения!',
          },
        };
      });
      (this.referencePack.dateRef.current as HTMLInputElement).classList.add('validationError');
    }
    if (this.state.formState.date !== '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            dateError: '',
          },
        };
      });
    }
  }

  async validateSelect() {
    if (this.state.formState.location === '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            locationError: 'Вы должны указать место проведения!',
          },
        };
      });
      (this.referencePack.locationRef.current as HTMLSelectElement).classList.add(
        'validationError'
      );
    }
    if (this.state.formState.location !== '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            locationError: '',
          },
        };
      });
    }
  }

  async validateCheckbox() {
    if (!this.state.formState.openProject) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            openProjectError: 'Вы должны открыть проект!',
          },
        };
      });
      (this.referencePack.openProjectRef.current as HTMLInputElement).classList.add(
        'validationError'
      );
    }
    if (this.state.formState.openProject) {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            openProjectError: '',
          },
        };
      });
    }
  }

  async validateFile() {
    if (this.state.formState.file === '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            fileError: 'Вы должны добавить изображение!',
          },
        };
      });
      (this.referencePack.fileRef.current as HTMLInputElement).classList.add('validationError');
    }
    if (this.state.formState.file !== '') {
      this.setState((prevState) => {
        return {
          ...prevState,
          errorState: {
            ...prevState.errorState,
            fileError: '',
          },
        };
      });
    }
  }

  async validateForm() {
    this.validateName()
      .then(() => this.validateDate())
      .then(() => this.validateSelect())
      .then(() => this.validateCheckbox())
      .then(() => this.validateFile())
      .then(() => {
        if (
          !this.state.errorState.nameError &&
          !this.state.errorState.dateError &&
          !this.state.errorState.locationError &&
          !this.state.errorState.openProjectError &&
          !this.state.errorState.fileError
        ) {
          this.setState((prevState) => {
            return {
              formState: {
                name: '',
                date: '',
                location: '',
                openProject: false,
                isCommercial: false,
                file: '',
              },
              errorState: {
                nameError: '',
                dateError: '',
                locationError: '',
                openProjectError: '',
                fileError: '',
              },
              formsList: [...prevState.formsList, this.state.formState],
            };
          });
          (this.nameRef.current as HTMLInputElement).value = '';
          (this.dateRef.current as HTMLInputElement).value = '';
          (this.locationRef.current as HTMLSelectElement).value = '';
          (this.openProjectRef.current as HTMLInputElement).checked = false;
          (this.isCommercialRef.current as HTMLInputElement).checked = false;
          (this.fileRef.current as HTMLInputElement).value = '';
        }
      });
  }

  render() {
    return (
      <div className="form-container">
        <form onSubmit={(event) => event.preventDefault()} className="form-box">
          <div className="form-box__name">
            <FormInput changeHandler={this.handleChange} reference={this.referencePack.nameRef} />
            <label htmlFor="name" className="form-box__name-label" data-testid="name">
              {this.state.errorState.nameError}
            </label>
          </div>
          <div className="form-box__date">
            <FormDateInput
              changeHandler={this.handleChange}
              reference={this.referencePack.dateRef}
            />
            <label htmlFor="date" className="form-box__date-label" data-testid="date">
              {this.state.errorState.dateError}
            </label>
          </div>
          <div className="form-box__location">
            <FormSelect
              changeHandler={this.handleChange}
              reference={this.referencePack.locationRef}
            />
            <label htmlFor="location" className="form-box__location-label" data-testid="location">
              {this.state.errorState.locationError}
            </label>
          </div>
          <div className="form-box__open">
            <h3>Подтвердите открытие проекта:</h3>
            <FormCheckbox
              changeHandler={this.handleCheck}
              reference={this.referencePack.openProjectRef}
            />
            <label htmlFor="openProject" className="form-box__open-label" data-testid="open">
              {this.state.errorState.openProjectError}
            </label>
          </div>
          <div className="form-box__switch">
            <h3>Выберите тип проекта:</h3>
            <div className="form-box__switch-wrap">
              <p>Некоммерческий</p>
              <FormSwitcher
                changeHandler={this.handleCheck}
                reference={this.referencePack.isCommercialRef}
              />
              <p>Коммерческий</p>
            </div>
          </div>
          <div className="form-box__file">
            <FormFileUpload
              changeHandler={this.handleImage}
              reference={this.referencePack.fileRef}
            />
            <label htmlFor="file" className="form-box__file-label" data-testid="file">
              {this.state.errorState.fileError}
            </label>
          </div>
          <input
            type="submit"
            value="Создать"
            onClick={() => {
              this.validateForm();
            }}
          />
        </form>
        {
          <div className="cards-box">
            {this.state.formsList.map((cardData, index) => (
              <Minicard key={index} cardData={cardData} data-testid={`card-${index}`} />
            ))}
          </div>
        }
      </div>
    );
  }
}
