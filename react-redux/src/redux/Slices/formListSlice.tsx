import { createSlice } from '@reduxjs/toolkit';
import { IFormData } from '../../components/Form/Form-interfaces';
import { IFormListAction } from '../reduxTypes';

const initialState = {
  cards: [] as IFormData[],
};

const formListSlice = createSlice({
  name: 'formList',
  initialState,
  reducers: {
    addCard: (state, action: IFormListAction) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export const formListReducer = formListSlice.reducer;
export const { addCard } = formListSlice.actions;
