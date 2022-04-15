import React, { ChangeEvent } from 'react';
import './Switcher.scss';

export default class FormSwitcher extends React.Component<{
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
      <label className="switcher">
        <input
          className="switch"
          type="checkbox"
          defaultChecked={false}
          onChange={(event) => {
            this.props.changeHandler(event);
          }}
          ref={this.props.reference}
          name="isCommercial"
        />
        <span className="slider"></span>
      </label>
    );
  }
}
