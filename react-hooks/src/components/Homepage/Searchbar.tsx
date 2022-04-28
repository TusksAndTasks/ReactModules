import React, { useEffect, useState } from 'react';

export default function Searchbar(props: ISearchProps) {
  const inputRef = React.useRef(null) as React.RefObject<HTMLInputElement>;

  const [localData, setLocalData] = useState('');
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const search = inputRef.current as HTMLInputElement;
    if (localStorage.getItem('search-bar')) {
      setLocalData(localStorage.getItem('search-bar') as string);
      setSearchString(localData);
    }
    return () => {
      localStorage.setItem('search-bar', search.value);
    };
  }, [localData]);

  useEffect(() => {
    const { updateCardsData, clearState } = props;
    async function getCardsData() {
      try {
        const response = await fetch(
          `https:rickandmortyapi.com/api/character?name=${searchString}`
        );
        if (response.ok) {
          return response;
        }
      } catch (err) {
        console.log(err);
      }
    }

    getCardsData()
      .then((res) => res?.json())
      .then((data: IApiResponse | undefined) => updateCardsData(data?.results));

    return clearState;
  }, [searchString]); // Тут он просит передать в массив props-функции. Это вызывает бесконечный луп, я полагаю, ввиду изменения updateCardsData`a и stateClear`a на каждом вызове.Без понятия, как этот варнинг исправить;

  function handleSearchInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      setSearchString((inputRef.current as HTMLInputElement).value);
    }
  }

  return (
    <div>
      <input
        className="searchbar"
        type="search"
        placeholder="Search"
        autoComplete="off"
        defaultValue={localData}
        ref={inputRef}
        onKeyUp={handleSearchInput}
      />
    </div>
  );
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
  updateCardsData: (data: Array<IApiCardData> | undefined) => void;
  clearState: () => void;
}
