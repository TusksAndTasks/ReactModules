import { configureStore } from '@reduxjs/toolkit';
import { formListReducer } from './Slices/formListSlice';
import { searchbarReducers } from './Slices/searchBarSlice';

const store = configureStore({
  reducer: {
    searchBar: searchbarReducers,
    formList: formListReducer,
  },
});

export { store };
export type IState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
