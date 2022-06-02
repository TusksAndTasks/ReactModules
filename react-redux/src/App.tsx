import React, { useEffect } from 'react';
import 'typeface-inter';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/Homepage/Home';
import NotFound from './components/NotFound';
import Form from './components/Form/Form';
import { useForm, UseFormReturn } from 'react-hook-form';
import FullCard from './components/Homepage/FullCard';
import { useSelector } from 'react-redux';
import { IState } from './redux/store';
import { IFormData } from './components/Form/Form-interfaces';

export const FormDataContext = React.createContext<UseFormReturn<IFormData> | string>('');

function App() {
  const methods = useForm<IFormData>({
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

  const { headerVisible } = useSelector((state: IState) => state.searchBar);

  return (
    <div className="App">
      <header className={headerVisible ? 'header' : 'hidden'}>
        <Link to="/" className="header-link">
          <div className="header-logo"></div>
          <span className="header-link-text">Home</span>
        </Link>
        <Link to="/Forms" className="header-link">
          Create character
        </Link>
        <Link to="/Forms" className="header-link-mini"></Link>
      </header>
      <FormDataContext.Provider value={methods}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutUs" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/Forms" element={<Form />} />
          <Route path="/FullCard" element={<FullCard />} />
        </Routes>
      </FormDataContext.Provider>
      <footer>
        <Link to="/AboutUs" className="header-link" data-testid="21">
          About
        </Link>
      </footer>
    </div>
  );
}

export default App;
