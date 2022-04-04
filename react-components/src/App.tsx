import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import About from './components/About';
import HomePage from './components/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="App">
      <header className="header">
        <Link to={'/'} className="header-link">
          Главная
        </Link>
        <Link to={'/AboutUs'} className="header-link">
          О нас
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
