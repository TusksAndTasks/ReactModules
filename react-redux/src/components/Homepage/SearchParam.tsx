import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCardsDisplay, setFilter, setPage } from '../../redux/Slices/searchBarSlice';
import { AppDispatch, IState } from '../../redux/store';

export default function SearchParam({ nameArr }: { nameArr: string[] }) {
  const dispatch = useDispatch() as AppDispatch;
  const { params } = useSelector((state: IState) => state.searchBar);
  const { pageCount, filterString } = params;
  const [pagesState, setPagesState] = useState('');

  const options = [];

  for (let i = 1; i <= (pageCount as number); i++) {
    options.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }

  function setCurrentPage(e: React.ChangeEvent<HTMLSelectElement>) {
    setPagesState(e.target.value);
    dispatch(setPage(+e.target.value));
  }

  function setPaginationModel(e: React.ChangeEvent<HTMLSelectElement>) {
    if (e.target.value) {
      dispatch(setCardsDisplay(+e.target.value));
      setPagesState('');
    }
  }

  const filterInputs = nameArr.map((name) => (
    <label key={`label${name}`} htmlFor={`filter${name}`}>
      {`Character status: ${name}`}
      <input
        type="radio"
        name="filter"
        id={`filter${name}`}
        key={name}
        value={name.toLowerCase()}
        onChange={() => {
          dispatch(setFilter(name.toLowerCase()));
        }}
        defaultChecked={filterString === name.toLowerCase()}
      />
    </label>
  ));

  return (
    <div className="params">
      <div className="params-filter">{filterInputs}</div>
      <div className="params-pagination">
        <select name="pages" onChange={(e) => setCurrentPage(e)} value={pagesState}>
          <option value="">Choose page</option>
          {options}
        </select>
        <div>{pageCount ? pageCount : 0} pages</div>
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
