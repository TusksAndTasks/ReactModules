import React, { useRef } from 'react';
import Card from './Card';
import FullCard from './FullCard';
import { IApiCardData } from './Searchbar';

export default function Cards(props: ICardsProps) {
  const fullCardRef = useRef(null) as React.RefObject<HTMLInputElement>;

  return (
    <div className="cards">
      {props.isLoaded ? (
        props.cards.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            cardChanger={props.cardChanger}
            index={index}
            reference={fullCardRef}
          />
        ))
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
      {props.cards.length > 0 ? (
        <FullCard
          cardsData={props.cards}
          currentCard={props.currentCard}
          reference={fullCardRef}
          containerRef={props.containerRef}
        />
      ) : (
        props.isLoaded && <div>No results found</div>
      )}
    </div>
  );
}

export interface ICardsProps {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
  currentCard: number;
  containerRef: React.RefObject<HTMLInputElement>;
  cardChanger: (id: number) => void;
}
