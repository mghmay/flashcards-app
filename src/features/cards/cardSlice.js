import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: {},
  cardsForCurrQuiz: []
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setAllCards(state, action) {
      action.payload.forEach((card) => (state.cards[card.id] = card));
    },
    setCardsForCurrQuiz(state, action) {
      state.cardsForCurrQuiz = action.payload;
    },
    clearCardsForCurrQuiz(state) {
      state.cardsForCurrQuiz = [];
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;

export const selectCardsForCurrQuiz = (state) => state.cards.cardsForCurrQuiz;

export const { setAllCards, clearCardsForCurrQuiz, setCardsForCurrQuiz } =
  cardsSlice.actions;

export default cardsSlice.reducer;
