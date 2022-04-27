import React, { ChangeEvent } from 'react';
import './Date.scss';

export default class FormDateInput extends React.Component<{
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  reference: React.RefObject<HTMLInputElement>;
}> {
  constructor(props: {
    changeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    reference: React.RefObject<HTMLInputElement>;
  }) {
    super(props);
  }

  render() {
    return (
      <input
        type="date"
        placeholder="Введите дату мероприятия"
        min="2022-01-01"
        max="2052-01-01"
        onChange={(event) => {
          this.props.changeHandler(event);
          (this.props.reference.current as HTMLInputElement).classList.remove('validationError');
        }}
        ref={this.props.reference}
        name="date"
        className="form-box__date-input"
        data-testid="date-input"
      />
    );
  }
}
