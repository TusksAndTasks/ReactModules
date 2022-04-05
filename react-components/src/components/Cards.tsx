import React from 'react';
import Card from './Card';
import { data, Dataset } from '../Data';

export default class Cards extends React.Component<Record<string, never>, { dataset: Dataset[] }> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      dataset: data,
    };
    this.changeCheckedStatus = this.changeCheckedStatus.bind(this);
  }

  changeCheckedStatus(id: number) {
    this.setState((prevState) => {
      const updatedData = prevState.dataset.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            selected: !item.selected,
          };
        }
        return item;
      });
      return {
        dataset: updatedData,
      };
    });
  }

  render() {
    const card = this.state.dataset.map((item) => (
      <Card key={item.id} item={item} statusChanger={this.changeCheckedStatus} />
    ));
    return <div className="cards">{card}</div>;
  }
}
