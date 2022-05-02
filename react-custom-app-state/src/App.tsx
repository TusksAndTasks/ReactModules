import React, { Reducer, useEffect, useReducer } from 'react';
import 'typeface-inter';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/Homepage/Home';
import NotFound from './components/NotFound';
import Form from './components/Form/Form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { FormData } from './components/Form/Form';

export const FormDataContext = React.createContext<UseFormReturn<FormData> | string>('');
export const ListDataContext = React.createContext<IContextList | string>('');

const initialListState = [] as Array<FormData>;

function listStateReducer(state: FormData[], action: IListAction) {
  switch (action.type) {
    case 'addCard':
      return [...state, action.payload];
    default:
      return [...state];
  }
}

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

  useEffect(() => {
    methods.reset({ name: '', date: '', location: '', confirm: '', gender: 'Male', file: '' });
  }, [methods.formState.isSubmitSuccessful]);

  const [listState, dispatchListState] = useReducer<Reducer<FormData[], IListAction>>(
    listStateReducer,
    initialListState
  );

  return (
    <div className="App">
      <header className="header">
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
      <FormDataContext.Provider value={methods}>
        <ListDataContext.Provider
          value={{ dispatchListState: dispatchListState, listState: listState }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AboutUs" element={<About />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Forms" element={<Form />} />
          </Routes>
        </ListDataContext.Provider>
      </FormDataContext.Provider>
    </div>
  );
}

export default App;

interface IListAction {
  type: 'addCard';
  payload: FormData;
}

export interface IContextList {
  dispatchListState: React.Dispatch<IListAction>;
  listState: FormData[];
}
