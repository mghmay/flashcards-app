import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: {
    "123": {
      name: "Bird quiz",
      quizId: "123",
      topicId: "123",
      cardIds: ["123"]
    }
  }
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes[action.payload.quizId] = action.payload;
    },
    updateQuizCards: (state, action) => {
      const { quizId, cardIds } = action.payload;
      console.log(cardIds);
      cardIds.forEach((id) => {
        state.quizzes[quizId].cardIds.push(id);
      });
    }
  }
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;

export const { addQuiz, updateQuizCards } = quizzesSlice.actions;

export default quizzesSlice.reducer;
