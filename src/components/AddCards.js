import { nanoid } from "@reduxjs/toolkit";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  addAllCards,
  removeCardForCurrQuiz,
  addCardsForCurrQuiz,
} from "../features/cards/cardSlice";

const AddCards = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [addRemoveCurrCard, setAddRemoveCurrCard] = useState([]);

  useEffect(() => {
    if (addRemoveCurrCard.type === "remove") {
      dispatch(removeCardForCurrQuiz(addRemoveCurrCard.id));
      setAddRemoveCurrCard([]);
    }
    if (addRemoveCurrCard.type === "add") {
      dispatch(addCardsForCurrQuiz(addRemoveCurrCard.id));
      setAddRemoveCurrCard([]);
    }
  }, [addRemoveCurrCard]);

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((_, i) => index !== i));
    const id = e.target.value;
    setAddRemoveCurrCard({ type: "remove", id });
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    const id = nanoid();
    setCards(cards.concat({ front: "", back: "", id }));
    setAddRemoveCurrCard({ type: "add", id });
  };

  if (!hasLoaded) {
    const id = nanoid();
    setCards(cards.concat({ front: "", back: "", id }));
    setAddRemoveCurrCard({ type: "add", id });
    setHasLoaded(true);
  }

  return (
    <div>
      {cards.map((_, index) => (
        <div key={index} className="card-front-back">
          <input
            id={`card-front-${index}`}
            value={cards[index].front}
            onChange={(e) =>
              updateCardState(index, "front", e.currentTarget.value)
            }
            placeholder="Front"
          />

          <input
            id={`card-back-${index}`}
            value={cards[index].back}
            onChange={(e) =>
              updateCardState(index, "back", e.currentTarget.value)
            }
            placeholder="Back"
          />

          <div className="actions-container">
            <button
              onClick={(e) => removeCard(e, index)}
              value={cards[index].id}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        </div>
      ))}
      <button onClick={addCardInputs}>Add a Card</button>
    </div>
  );
};

export default AddCards;
