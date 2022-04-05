import React from 'react';
import Cards from './Cards';
import Searchbar from './Searchbar';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className="Home-container">
        <div className="Home-box">
          <Searchbar />
          <Cards />
        </div>
      </div>
    );
  }
}
