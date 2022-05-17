import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: {},
  cardsForCurrQuiz: []
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addAllCards(state, action) {
      action.payload.forEach((card) => (state.cards[card.id] = card));
    },
    addCardsForCurrQuiz(state, action) {
      state.cardsForCurrQuiz.push(action.payload);
    },
    removeCardForCurrQuiz(state, action) {
      state.cardsForCurrQuiz = state.cardsForCurrQuiz.filter(
        (id) => id !== action.payload
      );
    },
    clearCardsForCurrQuiz(state) {
      state.cardsForCurrQuiz = [];
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;

export const selectCardsForCurrQuiz = (state) => state.cards.cardsForCurrQuiz;

export const {
  addAllCards,
  removeCardForCurrQuiz,
  clearCardsForCurrQuiz,
  addCardsForCurrQuiz
} = cardsSlice.actions;

export default cardsSlice.reducer;
