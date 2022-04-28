import React from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends React.Component {
  render() {
    return (
      <div className="Notfound-container">
        <div className="Notfound-box">
          <h2>
            Oops! Page not found! Please, return to <Link to="/">main page</Link>
          </h2>
        </div>
      </div>
    );
  }
}
