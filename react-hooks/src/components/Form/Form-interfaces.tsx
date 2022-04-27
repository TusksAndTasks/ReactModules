export interface FormState {
  formState: FormData;
  errorState: {
    nameError: string;
    dateError: string;
    locationError: string;
    openProjectError: string;
    fileError: string;
  };
  formsList: Array<FormData>;
}

export interface References {
  nameRef: React.RefObject<HTMLInputElement>;
  dateRef: React.RefObject<HTMLInputElement>;
  locationRef: React.RefObject<HTMLSelectElement>;
  openProjectRef: React.RefObject<HTMLInputElement>;
  isCommercialRef: React.RefObject<HTMLInputElement>;
  fileRef: React.RefObject<HTMLInputElement>;
}

export interface FormData {
  name: string;
  date: string;
  location: string;
  openProject: boolean;
  isCommercial: boolean;
  file: string;
}

export interface Loc {
  [key: string]: string;
}
