import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchDataContext, HeaderDataContext } from '../../App';
import { IContextSearch, SearchEnum } from '../../State-manager';
import { IApiCardData } from './Searchbar';

export default function Card(props: ICardProps) {
  const { dispatchSearchState, searchState } = useContext(SearchDataContext) as IContextSearch;
  const header = useContext(HeaderDataContext) as React.RefObject<HTMLElement>;

  return (
    <Link to={'/FullCard'}>
      <div
        className={`card card_${props.item.status.toLowerCase()}`}
        data-testid={props.item.id}
        title="card"
        onClick={() => {
          dispatchSearchState({ type: SearchEnum.PICKCARD, currentID: props.item.id });
          header.current?.classList.add('hidden');
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
    </Link>
  );
}

interface ICardProps {
  item: IApiCardData;
  index: number;
  reference: React.RefObject<HTMLInputElement>;
}
