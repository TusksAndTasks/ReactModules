import React, { ChangeEvent } from 'react';
import './File.scss';

export default class FormFileUpload extends React.Component<{
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
        type="file"
        onChange={(event) => {
          this.props.changeHandler(event);
          (this.props.reference.current as HTMLInputElement).classList.remove('validationError');
        }}
        ref={this.props.reference}
        name="file"
        className="form-box__file-input"
        data-testid="file-input"
      />
    );
  }
}
