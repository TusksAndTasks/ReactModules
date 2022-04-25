import React from 'react';
import { IApiCardData } from './Searchbar';

export default class Card extends React.Component<{
  item: IApiCardData;
  cardChanger: (id: number) => void;
  index: number;
  reference: React.RefObject<HTMLInputElement>;
}> {
  render() {
    return (
      <div
        className={`card card_${this.props.item.status}`}
        data-testid={this.props.item.id}
        title="card"
        onClick={() => {
          this.props.cardChanger(this.props.index);
          (this.props.reference.current as HTMLElement).classList.remove('hidden');
        }}
      >
        <img src={this.props.item.image} />
        <h3 data-testid="card" className="card__name">
          {this.props.item.name}
        </h3>
        <p>{this.props.item.gender}</p>
        <p>{this.props.item.species}</p>
        <p>Status: {this.props.item.status.toLowerCase()}</p>
      </div>
    );
  }
}
