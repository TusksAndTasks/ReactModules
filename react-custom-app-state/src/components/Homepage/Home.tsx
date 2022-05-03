import React, { useRef, useContext } from 'react';
import { SearchDataContext } from '../../App';
import { IContextSearch, SearchEnum } from '../../State-manager';
import Cards from './Cards';
import Searchbar, { IApiCardData } from './Searchbar';
import SearchParam from './SearchParam';

export default function HomePage() {
  const { dispatchSearchState, searchState } = useContext(SearchDataContext) as IContextSearch;
  const containerRef = useRef(null) as React.RefObject<HTMLInputElement>;

  function updateCardsData(data: Array<IApiCardData> | undefined) {
    dispatchSearchState({
      type: SearchEnum.DISPLAY,
      payload: data as Array<IApiCardData>,
    });
  }
  function clearCardsData() {
    dispatchSearchState({ type: SearchEnum.SEARCHING });
  }

  return (
    <div className="Home-container">
      <div className="Home-box">
        <Searchbar updateCardsData={updateCardsData} clearState={clearCardsData} />
        <div ref={containerRef}></div>
        <SearchParam />
        <Cards
          cards={searchState.cards}
          isLoaded={searchState.isLoaded}
          containerRef={containerRef}
        />
      </div>
    </div>
  );
}
