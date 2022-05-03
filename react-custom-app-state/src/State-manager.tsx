import { IApiCardData } from './components/Homepage/Searchbar';
import { FormData } from './components/Form/Form';

export const initialListState = [] as Array<FormData>;
export function listStateReducer(state: FormData[], action: IListAction) {
  switch (action.type) {
    case 'addCard':
      return [...state, action.payload];
    default:
      return [...state];
  }
}

export const initialSearchState = {
  cards: [],
  isLoaded: true,
  currentID: 1,
} as ISearchState;

export function searchStateReducer(state: ISearchState, action: ISearchAction) {
  switch (action.type) {
    case 'Display':
      return action.payload
        ? { ...state, cards: action.payload as Array<IApiCardData>, isLoaded: true }
        : { ...state, cards: [], isLoaded: true };
    case 'Searching':
      return { ...state, isLoaded: false };
    case 'Pick-a-card':
      return { ...state, currentID: action.currentID };
    default:
      return state;
  }
}

export const initialSearchParamState = {
  searchString: localStorage.getItem('search-bar') as string,
  filterString: '',
  pageCount: 0,
  currentPage: 1,
  shownCurrentPage: 1,
  displayedCards: 20,
};

export function searchParamStateReducer(state: ISearchParamState, action: ISearchParamAction) {
  switch (action.type) {
    case 'Search':
      return { ...state, searchString: action.searchString };
    case 'Filter':
      return { ...state, filterString: action.filterString };
    case 'Update-Pages':
      return { ...state, pageCount: action.pageCount };
    case 'Change-Page':
      return {
        ...state,
        currentPage: action.currentPage,
        shownCurrentPage: action.shownCurrentPage,
      };
    case 'Change-Cards-Display':
      return { ...state, displayedCards: action.displayedCards };
    default:
      return state;
  }
}

export interface IListAction {
  type: 'addCard';
  payload: FormData;
}

export interface IContextList {
  dispatchListState: React.Dispatch<IListAction>;
  listState: FormData[];
}

export enum SearchEnum {
  DISPLAY = 'Display',
  SEARCHING = 'Searching',
  PICKCARD = 'Pick-a-card',
}

export interface ISearchAction {
  type: SearchEnum;
  payload?: Array<IApiCardData>;
  currentID?: number;
}

export interface ISearchState {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
  currentID?: number;
}

export interface IContextSearch {
  dispatchSearchState: React.Dispatch<ISearchAction>;
  searchState: ISearchState;
}

export enum SearchParamEnum {
  SEARCH = 'Search',
  FILTER = 'Filter',
  UPDATEPAGES = 'Update-Pages',
  CHANGEPAGE = 'Change-Page',
  CHANGECARDSDISPLAY = 'Change-Cards-Display',
}

export interface ISearchParamAction {
  type: SearchParamEnum;
  searchString?: string;
  filterString?: string;
  pageCount?: number;
  currentPage?: number;
  displayedCards?: number;
  shownCurrentPage?: number;
}

export interface ISearchParamState {
  searchString?: string;
  filterString?: string;
  pageCount?: number;
  currentPage?: number;
  displayedCards?: number;
  shownCurrentPage?: number;
}

export interface IContextSearchParam {
  dispatchSearchParamState: React.Dispatch<ISearchParamAction>;
  searchParamState: ISearchParamState;
}
