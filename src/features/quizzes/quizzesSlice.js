import { createSlice } from "@reduxjs/toolkit";
import { addTopicQuiz } from "../topics/topicsSlice";

export const submitQuiz = (payload) => {
  const { quizId, topicId } = payload;
  return (dispatch) => {
    dispatch(addTopicQuiz({ quizId, topicId }));
    dispatch(addQuiz(payload));
  };
};

const initialState = {
  quizzes: {}
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes[action.payload.quizId] = action.payload;
    }
  }
});

export const selectAllQuizzes = (state) => state.quizzes.quizzes;

export const { addQuiz } = quizzesSlice.actions;

export default quizzesSlice.reducer;
