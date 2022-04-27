import React, { ChangeEvent } from 'react';
import './Checkbox.scss';

export default class FormCheckbox extends React.Component<{
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
        type="checkbox"
        defaultChecked={false}
        onChange={(event) => {
          this.props.changeHandler(event);
          (this.props.reference.current as HTMLInputElement).classList.remove('validationError');
        }}
        ref={this.props.reference}
        name="openProject"
        className="form-box__open-input"
        data-testid="open-input"
      />
    );
  }
}
