import './ApiCards.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IState } from '../../redux/store';
import { setCurrentCard } from '../../redux/Slices/searchBarSlice';
import { IApiCardData } from '../../redux/reduxTypes';

export default function FullCard() {
  const dispatch = useDispatch() as AppDispatch;
  const { currentID, cards } = useSelector((state: IState) => state.searchBar);
  const currentCard = cards.find((item) => item.id === currentID) as IApiCardData;

  return (
    <div>
      <div className="fullCard-header">
        <Link
          to="/"
          className="fullCard-header-link"
          onClick={() => {
            dispatch(setCurrentCard(0));
          }}
        >
          Back
        </Link>
        <div className="fullCard-header-text">Current card view - {currentCard.name}</div>
      </div>
      <div className="fullCard">
        <img src={currentCard.image} alt={currentCard.name} />
        <div className="fullCard__name">{currentCard.name}</div>
        <div>Gender: {currentCard.gender}</div>
        <div className="fullCard__episodes">
          Featured in episodes:
          <span>
            {currentCard.episode.map((item) => {
              return item.split('/').reverse()[0] + ' ';
            })}
          </span>
        </div>
        <p>Currently in location: {currentCard.location.name}</p>
        <p> Came from: {currentCard.origin.name}</p>
        <p>Species: {currentCard.species}</p>
        {currentCard.type && <div>Type: {currentCard.type}</div>}
        <div className={`fullCard__${currentCard.status.toLowerCase()}`}>{currentCard.status}</div>
      </div>
    </div>
  );
}
