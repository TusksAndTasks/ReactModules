import React from 'react';

export default class Searchbar extends React.Component<ISearchProps> {
  inputRef: React.RefObject<HTMLInputElement>;
  constructor(props: ISearchProps) {
    super(props);
    this.inputRef = React.createRef();
    this.makeAPIcall = this.makeAPIcall.bind(this);
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

  async handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      this.props.stateClear();
      const cardsData: IApiResponse | undefined = (await this.makeAPIcall()) as
        | IApiResponse
        | undefined;
      this.props.stateUpdater(cardsData?.results);
    }
  }

  async makeAPIcall() {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?name=${
          (this.inputRef.current as HTMLInputElement).value
        }`
      );
      if (response.ok) {
        return await response.json();
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
    }
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
          onKeyUp={(e) => this.handleSearch(e)}
        />
      </div>
    );
  }
}

export interface IApiResponse {
  info: {
    count: number;
    next: string;
    pages: number;
    prev: string;
  };
  results: Array<IApiCardData>;
}

export interface IApiCardData {
  created: string;
  episode: Array<string>;
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

interface ISearchProps {
  stateUpdater: (data: Array<IApiCardData> | undefined) => void;
  stateClear: () => void;
}
