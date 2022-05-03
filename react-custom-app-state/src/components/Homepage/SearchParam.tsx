import React, { useContext, useRef } from 'react';
import { SearchParamDataContext } from '../../App';
import { IContextSearchParam, SearchParamEnum } from '../../State-manager';

export default function SearchParam() {
  const { dispatchSearchParamState, searchParamState } = useContext(
    SearchParamDataContext
  ) as IContextSearchParam;
  const pagesRef = useRef(null) as React.RefObject<HTMLSelectElement>;

  const options = [];

  for (let i = 1; i <= (searchParamState.pageCount as number); i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  function setCurrentPage(e: React.ChangeEvent<HTMLSelectElement>) {
    switch (searchParamState.displayedCards) {
      case 10:
        dispatchSearchParamState({
          type: SearchParamEnum.CHANGEPAGE,
          currentPage: Math.ceil(+e.target.value / 2),
          shownCurrentPage: +e.target.value,
        });
        return;
      case 20:
        dispatchSearchParamState({
          type: SearchParamEnum.CHANGEPAGE,
          currentPage: +e.target.value,
          shownCurrentPage: +e.target.value,
        });
        return;
      case 40:
        dispatchSearchParamState({
          type: SearchParamEnum.CHANGEPAGE,
          currentPage: +e.target.value * 2 - 1,
          shownCurrentPage: +e.target.value * 2,
        });
        return;
    }
  }

  function setPaginationModel(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value) {
      if (+e.target.value === 40) {
        dispatchSearchParamState({
          type: SearchParamEnum.CHANGEPAGE,
          currentPage: 1,
          shownCurrentPage: 2,
        });
      } else {
        dispatchSearchParamState({
          type: SearchParamEnum.CHANGEPAGE,
          currentPage: 1,
          shownCurrentPage: 1,
        });
      }
      (pagesRef.current as HTMLSelectElement).value = '';
      dispatchSearchParamState({
        type: SearchParamEnum.CHANGECARDSDISPLAY,
        displayedCards: +e.target.value,
      });
    }
  }

  return (
    <div className="params">
      <div className="params-filter">
        Show:
        <input
          type="radio"
          name="filter"
          id="filterAlive"
          value="alive"
          onChange={() => {
            dispatchSearchParamState({
              type: SearchParamEnum.FILTER,
              filterString: 'alive',
            });
          }}
          defaultChecked={searchParamState.filterString === 'alive'}
        />
        <label htmlFor="filterAlive">Alive characters</label>
        <input
          type="radio"
          name="filter"
          id="filterDead"
          value="dead"
          onChange={() => {
            dispatchSearchParamState({
              type: SearchParamEnum.FILTER,
              filterString: 'dead',
            });
          }}
          defaultChecked={searchParamState.filterString === 'dead'}
        />
        <label htmlFor="filterDead">Dead characters</label>
        <input
          type="radio"
          name="filter"
          id="filterUnknown"
          value="unknown"
          onChange={() => {
            dispatchSearchParamState({
              type: SearchParamEnum.FILTER,
              filterString: 'unknown',
            });
          }}
          defaultChecked={searchParamState.filterString === 'unknown'}
        />
        <label htmlFor="filterDead">Characters with unknown status</label>
      </div>
      <div className="params-pagination">
        <select name="pages" onChange={(e) => setCurrentPage(e)} ref={pagesRef}>
          <option value="">Choose page</option>
          {options}
        </select>
        <div>{searchParamState.pageCount ? searchParamState.pageCount : 0} pages</div>
        <select name="cards-display" onChange={(e) => setPaginationModel(e)}>
          <option value="">Show on page:</option>
          <option value="10">10 cards</option>
          <option value="20">20 cards</option>
          <option value="40">40 cards</option>
        </select>
      </div>
    </div>
  );
}
