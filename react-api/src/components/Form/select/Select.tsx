import React, { ChangeEvent } from 'react';
import './Select.scss';

export default class FormSelect extends React.Component<{
  changeHandler: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  reference: React.RefObject<HTMLSelectElement>;
}> {
  constructor(props: {
    changeHandler: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    reference: React.RefObject<HTMLSelectElement>;
  }) {
    super(props);
  }

  render() {
    return (
      <select
        defaultValue=""
        onChange={(event) => {
          this.props.changeHandler(event);
          (this.props.reference.current as HTMLSelectElement).classList.remove('validationError');
        }}
        ref={this.props.reference}
        name="location"
        className="form-box__location-input"
      >
        <option value="">Выберите регион</option>
        <option value="RO">Ростовская область</option>
        <option value="Rostov">Ростов</option>
        <option value="Russia">Другой регион РФ</option>
        <option value="Online">Онлайн</option>
      </select>
    );
  }
}
