import React, { useContext, useEffect } from 'react';
import { SearchParamDataContext } from '../../App';
import { IContextSearchParam, SearchParamEnum } from '../../State-manager';

export default function Searchbar(props: ISearchProps) {
  const inputRef = React.useRef(null) as React.RefObject<HTMLInputElement>;
  const { dispatchSearchParamState, searchParamState } = useContext(
    SearchParamDataContext
  ) as IContextSearchParam;

  useEffect(() => {
    const search = inputRef.current as HTMLInputElement;
    return () => {
      localStorage.setItem('search-bar', search.value);
    };
  }, []);

  useEffect(() => {
    const { updateCardsData, clearState } = props;

    function setPages(data: IApiResponse | undefined) {
      switch (searchParamState.displayedCards) {
        case 10:
          dispatchSearchParamState({
            type: SearchParamEnum.UPDATEPAGES,
            pageCount: (data?.info.pages as number) * 2,
          });
          return;
        case 20:
          dispatchSearchParamState({
            type: SearchParamEnum.UPDATEPAGES,
            pageCount: data?.info.pages,
          });
          return;
        case 40:
          dispatchSearchParamState({
            type: SearchParamEnum.UPDATEPAGES,
            pageCount: Math.floor((data?.info.pages as number) / 2),
          });
          return;
      }
    }

    function setCardsData(data: IApiResponse | undefined) {
      if (searchParamState.displayedCards === 10) {
        return (searchParamState.shownCurrentPage as number) % 2 === 0
          ? data?.results.slice(10)
          : data?.results.slice(0, 10);
      } else if (searchParamState.displayedCards === 20) {
        return data?.results;
      } else if (searchParamState.displayedCards === 40) {
        return fetch(
          `https://rickandmortyapi.com/api/character?name=${searchParamState.searchString}&status=${searchParamState.filterString}&page=${searchParamState.shownCurrentPage}`
        )
          .then((res) => {
            if (!res.ok) {
              dispatchSearchParamState({
                type: SearchParamEnum.UPDATEPAGES,
                pageCount: 0,
              });
              dispatchSearchParamState({
                type: SearchParamEnum.CHANGEPAGE,
                currentPage: 1,
                shownCurrentPage: 2,
              });
              throw new Error();
            } else {
              return res.json();
            }
          })
          .then((res) => {
            return (data?.results as Array<IApiCardData>).concat(res.results);
          })
          .catch((err) => data?.results);
      }
    }

    async function getCardsData() {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character?name=${searchParamState.searchString}&status=${searchParamState.filterString}&page=${searchParamState.currentPage}`
        );
        if (response.ok) {
          return response;
        } else {
          dispatchSearchParamState({
            type: SearchParamEnum.UPDATEPAGES,
            pageCount: 0,
          });
          dispatchSearchParamState({
            type: SearchParamEnum.CHANGEPAGE,
            currentPage: 1,
            shownCurrentPage: searchParamState.displayedCards === 40 ? 2 : 1,
          });
        }
      } catch (err) {
        console.log(err);
      }
    }

    getCardsData()
      .then((res) => res?.json())
      .then((data: IApiResponse | undefined) => {
        setPages(data);
        return setCardsData(data);
      })
      .then((results) => updateCardsData(results));

    return clearState;
  }, [
    searchParamState.searchString,
    searchParamState.filterString,
    searchParamState.currentPage,
    searchParamState.displayedCards,
    searchParamState.shownCurrentPage,
  ]);

  function handleSearchInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      dispatchSearchParamState({
        type: SearchParamEnum.SEARCH,
        searchString: (inputRef.current as HTMLInputElement).value,
      });
    }
  }

  return (
    <div>
      <input
        className="searchbar"
        type="search"
        placeholder="Search"
        autoComplete="off"
        defaultValue={localStorage.getItem('search-bar') as string}
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
