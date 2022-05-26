import { IApiCardData } from '../../redux/reduxTypes';
import Card from './Card';

export default function Cards({ cards, isLoaded }: ICardsProps) {
  return (
    <div className="cards">
      {isLoaded ? (
        cards.map((item) => <Card key={item.id} item={item} />)
      ) : (
        <div className="loading-wrapper">
          <p className="loading-text">Loading</p>
          <div className="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      {cards.length === 0 && isLoaded && <div>No results found</div>}
    </div>
  );
}

export interface ICardsProps {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
}
