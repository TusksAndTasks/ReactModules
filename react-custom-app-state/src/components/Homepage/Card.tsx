import React from 'react';
import { IApiCardData } from './Searchbar';

export default function Card(props: ICardProps) {
  return (
    <div
      className={`card card_${props.item.status.toLowerCase()}`}
      data-testid={props.item.id}
      title="card"
      onClick={() => {
        props.cardChanger(props.item.id);
        (props.reference.current as HTMLElement).classList.remove('hidden');
      }}
    >
      <img src={props.item.image} alt={`character portrait ${props.item.name}`} />
      <h3 data-testid="card" className="card__name">
        {props.item.name}
      </h3>
      <p>{props.item.gender}</p>
      <p>{props.item.species}</p>
      <p>Status: {props.item.status.toLowerCase()}</p>
    </div>
  );
}

interface ICardProps {
  item: IApiCardData;
  cardChanger: (id: number) => void;
  index: number;
  reference: React.RefObject<HTMLInputElement>;
}
