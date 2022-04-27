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
  return ReactDOM.createPortal(
    <div
      className="hidden card-overlay"
      ref={props.reference}
      onClick={(e) => {
        if (
          (e.target as HTMLElement).classList.contains('fullCard__closeBtn') ||
          (e.target as HTMLElement).classList.contains('card-overlay')
        ) {
          (props.reference.current as HTMLElement).classList.add('hidden');
        }
      }}
    >
      <div className="fullCard">
        <div className="fullCard__closeBtn" data-testid="close"></div>
        <img src={currentCard.image} />
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
        {currentCard.type ? <div>Type: {currentCard.type}</div> : null}
        <div className={`fullCard__${currentCard.status}`}>{currentCard.status}</div>
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
