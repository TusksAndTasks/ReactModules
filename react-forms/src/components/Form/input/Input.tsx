import React, { ChangeEvent } from 'react';
import './input.scss';

export default class FormInput extends React.Component<{
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
        type="input"
        placeholder="Введите Ваши имя и фамилию"
        onChange={(event) => {
          this.props.changeHandler(event);
          (this.props.reference.current as HTMLInputElement).classList.remove('validationError');
        }}
        ref={this.props.reference}
        name="name"
        className="form-box__name-input"
      />
    );
  }
}
