import React from 'react';
import { FormData, Loc } from '../Form-interfaces';
import './Minicard.scss';

export default class Minicard extends React.Component<{
  cardData: FormData;
}> {
  render() {
    return (
      <div className="minicard">
        <img src={this.props.cardData.file} />
        <p>{this.props.cardData.name}</p>
        <p>{this.props.cardData.date.split('-').reverse().join('.')}</p>
        <p>{(locations as Loc)[this.props.cardData.location]}</p>
        <p>Тип: {this.props.cardData.isCommercial ? 'Коммерческий' : 'Некоммерческий'}</p>
        <div>Проект открыт!</div>
      </div>
    );
  }
}

const locations = {
  RO: 'Ростовская область',
  Rostov: 'Ростов-на-Дону',
  Russia: 'Россия',
  Online: 'Онлайн',
};
