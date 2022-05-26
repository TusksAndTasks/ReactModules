import { IFormData } from '../components/Form/Form-interfaces';

export interface IDisplayData {
  searchString?: string;
  filterString?: string;
  currentPage?: number;
}

export interface IAdditionalDisplayData {
  searchString?: string;
  filterString?: string;
  shownCurrentPage?: number;
}

export interface ISearchState {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
  currentID?: number;
  headerVisible: boolean;
  params: ISearchParamState;
}

export interface ISearchParamState {
  searchString?: string;
  filterString?: string;
  pageCount?: number;
  currentPage?: number;
  displayedCards?: number;
  shownCurrentPage?: number;
}

export interface IApiResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: Array<IApiCardData>;
}

export interface IApiCardData {
  created: string;
  episode: Array<string>;
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

export interface IStringAction {
  type: string;
  payload: string;
}

export interface INumberAction {
  type: string;
  payload: number;
}

export interface IFormListAction {
  type: string;
  payload: IFormData;
}
