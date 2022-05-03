import React, { Reducer, useEffect, useReducer, useRef } from 'react';
import 'typeface-inter';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/Homepage/Home';
import NotFound from './components/NotFound';
import Form from './components/Form/Form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormData } from './components/Form/Form';
import FullCard from './components/Homepage/FullCard';
import {
  IContextList,
  IContextSearch,
  IContextSearchParam,
  IListAction,
  initialListState,
  ISearchState,
  ISearchAction,
  searchStateReducer,
  initialSearchState,
  ISearchParamState,
  ISearchParamAction,
  searchParamStateReducer,
  initialSearchParamState,
  listStateReducer,
} from './State-manager';

export const FormDataContext = React.createContext<UseFormReturn<FormData> | string>('');
export const ListDataContext = React.createContext<IContextList | string>('');
export const SearchDataContext = React.createContext<IContextSearch | string>('');
export const SearchParamDataContext = React.createContext<IContextSearchParam | string>('');
export const HeaderDataContext = React.createContext<React.RefObject<HTMLElement> | string>('');

function App() {
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

  const headerRef = useRef(null) as React.RefObject<HTMLElement>;

  useEffect(() => {
    methods.reset({ name: '', date: '', location: '', confirm: '', gender: 'Male', file: '' });
  }, [methods.formState.isSubmitSuccessful]);

  const [listState, dispatchListState] = useReducer<Reducer<FormData[], IListAction>>(
    listStateReducer,
    initialListState
  );

  const [searchState, dispatchSearchState] = useReducer<Reducer<ISearchState, ISearchAction>>(
    searchStateReducer,
    initialSearchState
  );

  const [searchParamState, dispatchSearchParamState] = useReducer<
    Reducer<ISearchParamState, ISearchParamAction>
  >(searchParamStateReducer, initialSearchParamState);

  return (
    <div className="App">
      <header className="header" ref={headerRef}>
        <Link to={'/'} className="header-link">
          Home
        </Link>
        <Link to={'/AboutUs'} className="header-link" data-testid="21">
          About
        </Link>
        <Link to={'/Forms'} className="header-link">
          Create character
        </Link>
      </header>
      <HeaderDataContext.Provider value={headerRef}>
        <SearchParamDataContext.Provider
          value={{
            dispatchSearchParamState: dispatchSearchParamState,
            searchParamState: searchParamState,
          }}
        >
          <SearchDataContext.Provider
            value={{ dispatchSearchState: dispatchSearchState, searchState: searchState }}
          >
            <FormDataContext.Provider value={methods}>
              <ListDataContext.Provider
                value={{ dispatchListState: dispatchListState, listState: listState }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/AboutUs" element={<About />} />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/Forms" element={<Form />} />
                  <Route path="/FullCard" element={<FullCard />} />
                </Routes>
              </ListDataContext.Provider>
            </FormDataContext.Provider>
          </SearchDataContext.Provider>
        </SearchParamDataContext.Provider>
      </HeaderDataContext.Provider>
    </div>
  );
}

export default App;
