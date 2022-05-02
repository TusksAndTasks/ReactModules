import React from 'react';
import { IApiCardData } from './Searchbar';
import './ApiCards.scss';
import ReactDOM from 'react-dom';

export default function FullCard(props: IFullCardProps) {
  const defaultIndex = 0;
  const currentCard = props.currentCard
    ? (props.cardsData.find((item) => item.id === props.currentCard) as IApiCardData)
    : props.cardsData[defaultIndex];
  const container = props.containerRef.current as HTMLDivElement;
  function closeFullCard(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains('fullCard__closeBtn') ||
      target.classList.contains('card-overlay')
    ) {
      (props.reference.current as HTMLElement).classList.add('hidden');
    }
  }

  return ReactDOM.createPortal(
    <div className="hidden card-overlay" ref={props.reference} onClick={closeFullCard}>
      <div className="fullCard">
        <button className="fullCard__closeBtn" data-testid="close"></button>
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
    </div>,
    container
  );
}

interface IFullCardProps {
  cardsData: Array<IApiCardData>;
  currentCard: number;
  reference: React.RefObject<HTMLInputElement>;
  containerRef: React.RefObject<HTMLInputElement>;
}
