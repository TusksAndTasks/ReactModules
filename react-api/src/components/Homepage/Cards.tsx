import React from 'react';
import Card from './Card';
import FullCard from './FullCard';
import { IApiCardData } from './Searchbar';

export default class Cards extends React.Component<ICardsProps> {
  fullCardRef: React.RefObject<HTMLInputElement>;
  constructor(props: ICardsProps) {
    super(props);
    this.fullCardRef = React.createRef();
  }

  render() {
    return (
      <div className="cards">
        {this.props.isLoaded ? (
          this.props.cards.map((item, index) => (
            <Card
              key={item.id}
              item={item}
              cardChanger={this.props.cardChanger}
              index={index}
              reference={this.fullCardRef}
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
        {this.props.cards.length > 0 ? (
          <FullCard
            cardsData={this.props.cards}
            currentCard={this.props.currentCard}
            reference={this.fullCardRef}
            containerRef={this.props.containerRef}
          />
        ) : this.props.isLoaded ? (
          <div>No results found</div>
        ) : null}
      </div>
    );
  }
}

export interface ICardsProps {
  cards: Array<IApiCardData>;
  isLoaded: boolean;
  currentCard: number;
  containerRef: React.RefObject<HTMLInputElement>;
  cardChanger: (id: number) => void;
}
