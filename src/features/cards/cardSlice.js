import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cards: {
    "123": {
      cardId: "123",
      front: "Bird",
      back: "Birb"
    }
  },
  tempCards: []
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addCards(state) {
      state.tempCards.forEach((card) => {
        state.cards[card.cardId] = card;
      });
    },
    addTempCardInputs(state) {
      state.tempCards.push({ front: "", back: "", cardId: nanoid() });
    },
    updateTempCards(state, action) {
      const { index, side, value } = action.payload;
      state.tempCards[index][side] = value;
    },
    removeTempCard(state, action) {
      state.tempCards = state.tempCards.filter((_, i) => action.payload !== i);
    },
    clearTempCards(state) {
      state.tempCards = [];
    }
  }
});

export const selectAllCards = (state) => state.cards.cards;

export const selectTempCardIds = (state) =>
  state.cards.tempCards.map((card) => card.cardId);

export const selectTempCards = (state) => state.cards.tempCards;

export const selectCardsForCurrQuiz = (state) => state.cards.cardsForCurrQuiz;

export const {
  addCards,
  addTempCardInputs,
  clearTempCards,
  updateTempCards,
  removeTempCard
} = cardsSlice.actions;

export default cardsSlice.reducer;
