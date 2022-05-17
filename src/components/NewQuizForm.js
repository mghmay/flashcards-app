import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import ROUTES from "../app/routes";

import { selectAllTopics } from "../features/topics/topicsSlice";
import { submitQuiz } from "../features/quizzes/quizzesSlice";
import {
  selectCardsForCurrQuiz,
  clearCardsForCurrQuiz,
} from "../features/cards/cardSlice";

import AddCards from "./AddCards";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [addNewCard, setAddNewCard] = useState(false);
  const [topicId, setTopicId] = useState("");

  const history = useHistory();

  const cardIds = useSelector(selectCardsForCurrQuiz);
  const topics = useSelector(selectAllTopics);
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

    dispatch(submitQuiz({ name, quizId: nanoid(), topicId, cardIds }));

    dispatch(clearCardsForCurrQuiz());
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
        {addNewCard || (
          <button onClick={(e) => setAddNewCard(true)}>Add cards</button>
        )}
        {addNewCard && <AddCards />}
        <div className="actions-container">
          <button className="update-quiz">Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
