import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: {}
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards: {
      reducer(state, action) {
        action.payload.forEach((card) => (state.cards[card.id] = card));
      }
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;

export const { addCards } = cardsSlice.actions;

export default cardsSlice.reducer;
