import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  displayAdditionalCards,
  displayCards,
  setSearchString,
} from '../../redux/Slices/searchBarSlice';
import { AppDispatch, IState } from '../../redux/store';

export default function Searchbar() {
  const dispatch = useDispatch() as AppDispatch;
  const { params } = useSelector((state: IState) => state.searchBar);
  const { searchString, filterString, currentPage, shownCurrentPage, displayedCards } = params;
  const [searchState, setSearchState] = useState(localStorage.getItem('search-bar') as string);

  useEffect(() => {
    localStorage.setItem('search-bar', searchState);
  }, [searchState]);

  useEffect(() => {
    dispatch(displayCards({ searchString, filterString, currentPage })).then(() => {
      if (displayedCards === 40) {
        dispatch(displayAdditionalCards({ searchString, filterString, shownCurrentPage }));
      }
    });
  }, [searchString, filterString, currentPage, displayedCards, shownCurrentPage]);

  function handleSearchInput(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter') {
      dispatch(setSearchString(searchState));
    }
  }

  return (
    <input
      className="searchbar"
      type="search"
      placeholder="Search"
      autoComplete="off"
      value={searchState}
      onKeyUp={handleSearchInput}
      onChange={(e) => setSearchState(e.target.value)}
    />
  );
}
