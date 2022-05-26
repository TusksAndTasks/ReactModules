import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IApiCardData } from '../../redux/reduxTypes';
import { setCurrentCard } from '../../redux/Slices/searchBarSlice';
import { AppDispatch } from '../../redux/store';

export default function Card({ item }: { item: IApiCardData }) {
  const dispatch = useDispatch() as AppDispatch;
  const { id, image, name, gender, species, status } = item;
  function pickCard() {
    dispatch(setCurrentCard(id));
  }

  return (
    <Link to={'/FullCard'}>
      <div
        className={`card card_${status.toLowerCase()}`}
        data-testid={id}
        title="card"
        onClick={pickCard}
      >
        <img src={image} alt={`character portrait ${name}`} />
        <h3 data-testid="card" className="card__name">
          {name}
        </h3>
        <p>{gender}</p>
        <p>{species}</p>
        <p>Status: {status.toLowerCase()}</p>
      </div>
    </Link>
  );
}
