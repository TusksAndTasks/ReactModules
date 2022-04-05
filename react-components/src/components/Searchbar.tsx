import React from 'react';

export default class Searchbar extends React.Component {
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: Record<string, never>) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    if (localStorage.getItem('search-bar')) {
      return localStorage.getItem('search-bar') as string;
    } else {
      return undefined;
    }
  }

  componentWillUnmount() {
    const search = this.inputRef.current as HTMLInputElement;
    localStorage.setItem('search-bar', search.value);
  }

  render() {
    return (
      <div>
        <input
          className="searchbar"
          type="search"
          placeholder="поиск"
          autoComplete="off"
          defaultValue={this.componentDidMount()}
          ref={this.inputRef}
        />
      </div>
    );
  }
}
