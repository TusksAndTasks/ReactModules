export interface IFormState {
  formState: IFormData;
  errorState: {
    nameError: string;
    dateError: string;
    locationError: string;
    openProjectError: string;
    fileError: string;
  };
  formsList: Array<IFormData>;
}

export interface References {
  nameRef: React.RefObject<HTMLInputElement>;
  dateRef: React.RefObject<HTMLInputElement>;
  locationRef: React.RefObject<HTMLSelectElement>;
  openProjectRef: React.RefObject<HTMLInputElement>;
  isCommercialRef: React.RefObject<HTMLInputElement>;
  fileRef: React.RefObject<HTMLInputElement>;
}

export interface Loc {
  [key: string]: string;
}

export interface IFormData {
  name: string;
  date: string;
  location: string;
  confirm: string;
  gender: string;
  file: string;
}

export interface ISelectProps {
  options: string[];
}

export interface miniCardProps {
  cardData: IFormData;
  testid: string;
}
