import React from 'react';
import 'typeface-inter';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/Homepage/Home';
import NotFound from './components/NotFound';
import Form from './components/Form/Form';

function App() {
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Forms" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
