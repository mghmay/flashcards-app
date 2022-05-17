import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import ROUTES from "../app/routes";

import { selectAllTopics, addTopicQuiz } from "../features/topics/topicsSlice";
import AddCards from "./AddCards";
import { addQuiz } from "../features/quizzes/quizzesSlice";
import {
  selectTempCardIds,
  addCards,
  clearTempCards,
} from "../features/cards/cardSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [topicId, setTopicId] = useState("");

  const history = useHistory();

  const topics = useSelector(selectAllTopics);
  const cardIds = useSelector(selectTempCardIds);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      alert("Please enter a name");
      return;
    }

    if (!topicId) {
      alert("Please enter a topic");
      return;
    }
    const quizId = nanoid();

    dispatch(addTopicQuiz({ quizId, topicId }));
    dispatch(addQuiz({ name, quizId, topicId, cardIds }));
    dispatch(addCards());
    dispatch(clearTempCards());
    setName("");
    setTopicId("");

    history.push(ROUTES.quizzesRoute());
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        <AddCards />
        <div className="actions-container">
          <button className="update-quiz">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
