import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="Notfound-container">
        <div className="Notfound-box">
          <h2>
            Упс! Данной страницы не существует. Пожалуйста, вернитесь на{' '}
            <Link to="/">главную страницу</Link>
          </h2>
        </div>
      </div>
    );
  }
}
