import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IApiResponse, INumberAction, IStringAction } from '../reduxTypes';
import { ISearchState } from '../reduxTypes';
import { IAdditionalDisplayData, IDisplayData } from '../reduxTypes';

const initialState = {
  cards: [],
  isLoaded: true,
  currentID: 1,
  headerVisible: true,
  params: {
    searchString: localStorage.getItem('search-bar') as string,
    filterString: '',
    pageCount: 0,
    currentPage: 1,
    shownCurrentPage: 1,
    displayedCards: 20,
  },
} as ISearchState;

const displayCards = createAsyncThunk<IApiResponse, IDisplayData, Record<never, string>>(
  'searchbar/displayCards',
  async (data) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?name=${data.searchString}&status=${data.filterString}&page=${data.currentPage}`
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error();
  }
);

const displayAdditionalCards = createAsyncThunk<
  IApiResponse,
  IAdditionalDisplayData,
  Record<never, string>
>('searchbar/displayAdditionalCards', async (data) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?name=${data.searchString}&status=${data.filterString}&page=${data.shownCurrentPage}`
  );
  if (response.ok) {
    return await response.json();
  }
  throw new Error();
});

const searchbarSlice = createSlice({
  name: 'searchbar',
  initialState,
  reducers: {
    setSearchString: (state, action: IStringAction) => {
      state.params.searchString = action.payload;
    },
    setFilter: (state, action: IStringAction) => {
      state.params.filterString = action.payload;
      state.params.currentPage = 1;
      state.params.shownCurrentPage = state.params.displayedCards === 40 ? 2 : 1;
    },
    setPage: (state, action: INumberAction) => {
      switch (state.params.displayedCards) {
        case 10:
          state.params.currentPage = Math.ceil(action.payload / 2);
          state.params.shownCurrentPage = action.payload;
          return;
        case 20:
          state.params.currentPage = action.payload;
          state.params.shownCurrentPage = action.payload;
          return;
        case 40:
          state.params.currentPage = action.payload * 2 - 1;
          state.params.shownCurrentPage = action.payload * 2;
          return;
      }
    },
    setCardsDisplay: (state, action: INumberAction) => {
      state.params.displayedCards = action.payload;
      state.params.currentPage = 1;
      state.params.shownCurrentPage = state.params.displayedCards === 40 ? 2 : 1;
    },
    setCurrentCard: (state, action: INumberAction) => {
      if (action.payload > 0) {
        state.currentID = action.payload;
        state.headerVisible = false;
      } else {
        state.currentID = 1;
        state.headerVisible = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(displayCards.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(displayCards.fulfilled, (state, action) => {
      state.isLoaded = true;
      if (state.params.displayedCards === 10) {
        state.params.pageCount = action.payload.info.pages * 2;
        (state.params.shownCurrentPage as number) % 2 === 0
          ? (state.cards = action.payload.results.slice(10))
          : (state.cards = action.payload.results.slice(0, 10));
      } else {
        state.params.pageCount =
          state.params.displayedCards === 20
            ? action.payload.info.pages
            : action.payload.info.pages / 2;
        state.cards = action.payload.results;
      }
    });
    builder.addCase(displayCards.rejected, (state) => {
      state.params.pageCount = 0;
      state.params.currentPage = 1;
      state.params.shownCurrentPage = state.params.displayedCards === 40 ? 2 : 1;
      state.cards = [];
      state.isLoaded = true;
    });
    builder.addCase(displayAdditionalCards.pending, (state) => {
      state.isLoaded = false;
    });
    builder.addCase(displayAdditionalCards.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.cards = [...state.cards, ...action.payload.results];
    });
    builder.addCase(displayAdditionalCards.rejected, (state) => {
      state.params.pageCount = 0;
      state.params.currentPage = 1;
      state.params.shownCurrentPage = 2;
      state.cards = [];
      state.isLoaded = true;
    });
  },
});

export const searchbarReducers = searchbarSlice.reducer;
export { displayCards, displayAdditionalCards };
export const { setSearchString, setFilter, setPage, setCardsDisplay, setCurrentCard } =
  searchbarSlice.actions;
