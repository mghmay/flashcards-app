import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: {
    "123": {
      name: "birds",
      id: "123",
      icon: "https://static-assets.codecademy.com/skillpaths/react-redux/redux-quiz-app/bird.svg",
      quizIds: []
    }
  }
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopic: (state, action) => {
      state.topics[action.payload.id] = action.payload;
    },
    addTopicQuiz: (state, action) => {
      state.topics[action.payload.topicId].quizIds.push(action.payload.quizId);
    }
  }
});

export const selectAllTopics = (state) => state.topics.topics;

export const { addTopic, addTopicQuiz } = topicsSlice.actions;

export default topicsSlice.reducer;
