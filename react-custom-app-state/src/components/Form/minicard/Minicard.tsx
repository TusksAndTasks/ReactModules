import React from 'react';
import { FormData } from '../Form';
import './Minicard.scss';

export default function Minicard(props: miniCardProps) {
  return (
    <div className="minicard" data-testid={props.testid}>
      <img src={props.cardData.file} />
      <p>Name: {props.cardData.name}</p>
      <p>Birthday: {props.cardData.date.split('-').reverse().join('.')}</p>
      <p>Origin: {props.cardData.location}</p>
      <p>Gender: {props.cardData.gender}</p>
      <div>Character created!</div>
    </div>
  );
}

interface miniCardProps {
  key: string;
  cardData: FormData;
  testid: string;
}
