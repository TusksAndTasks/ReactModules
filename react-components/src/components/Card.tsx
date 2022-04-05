import React from 'react';
import { Dataset } from '../Data';

export default class Card extends React.Component<{
  item: Dataset;
  statusChanger: (id: number) => void;
}> {
  render() {
    return (
      <div className="card" data-testid={this.props.item.id} title="card">
        <img src={this.props.item.image} />
        <h3 className="card-title">{this.props.item.title}</h3>
        <p className="card-author">{this.props.item.author}</p>
        <div className="card-description">{this.props.item.description}</div>
        <div className={this.props.item.open ? 'card-open' : 'card-closed'}>
          {this.props.item.open ? 'Проект открыт' : 'Проект закрыт'}
        </div>
        <div
          className={this.props.item.selected ? 'card-selected' : 'card-notSelected'}
          data-testid={`open-${this.props.item.id}`}
          onClick={() => {
            if (this.props.item.open) {
              this.props.statusChanger(this.props.item.id);
            } else {
              alert('Проект закрыт! Запись невозможна!');
            }
          }}
        >
          {this.props.item.selected ? 'Вы записаны' : 'Записаться на проект'}
        </div>
      </div>
    );
  }
}
