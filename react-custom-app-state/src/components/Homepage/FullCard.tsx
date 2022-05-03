import React, { useContext } from 'react';
import { IApiCardData } from './Searchbar';
import './ApiCards.scss';
import ReactDOM from 'react-dom';
import { IContextSearch } from '../../State-manager';
import { Link } from 'react-router-dom';
import { SearchDataContext, HeaderDataContext } from '../../App';

export default function FullCard() {
  const { dispatchSearchState, searchState } = useContext(SearchDataContext) as IContextSearch;
  const header = useContext(HeaderDataContext) as React.RefObject<HTMLElement>;

  const currentCard = searchState.cards.find(
    (item) => item.id === searchState.currentID
  ) as IApiCardData;

  return (
    <div>
      <div className="fullCard-header">
        <Link
          to={'/'}
          className="fullCard-header-link"
          onClick={() => header.current?.classList.remove('hidden')}
        >
          Back
        </Link>
        <div className="fullCard-header-text">Current card view - {currentCard.name}</div>
      </div>
      <div className="fullCard">
        <img src={currentCard.image} alt={`${currentCard.name}`} />
        <div className="fullCard__name">{currentCard.name}</div>
        <div>Gender: {currentCard.gender}</div>
        <div className="fullCard__episodes">
          Featured in episodes:
          <span>
            {currentCard.episode.map((item) => {
              return item.split('/').reverse()[0] + ' ';
            })}{' '}
          </span>
        </div>
        <div>Currently in location: {currentCard.location.name}</div>
        <div> Came from: {currentCard.origin.name}</div>
        <div>Species: {currentCard.species}</div>
        {currentCard.type && <div>Type: {currentCard.type}</div>}
        <div className={`fullCard__${currentCard.status.toLowerCase()}`}>{currentCard.status}</div>
      </div>
    </div>
  );
}
