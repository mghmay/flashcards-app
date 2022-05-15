import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topics: {}
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    addTopic: {
      reducer(state, action) {
        state.topics[action.payload.name.id] = action.payload.name;
      },
      prepare(name, icon, id) {
        return {
          payload: {
            name,
            icon,
            quizIds: [],
            id
          }
        };
      }
    },
    addTopicQuiz: (state, action) => {
      state.topics[action.payload.topicId].quizIds.push(action.payload.quizId);
    }
  }
});

export const selectAllTopics = (state) => state.topics.topics;

export const { addTopic, addTopicQuiz } = topicsSlice.actions;

export default topicsSlice.reducer;
