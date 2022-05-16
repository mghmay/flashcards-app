import { nanoid } from "@reduxjs/toolkit";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addCards, setCardsForCurrQuiz } from "../features/cards/cardSlice";

const AddCards = () => {
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  const [cardIds, setCardIds] = useState([]);
  const cardsRef = useRef(1);

  useEffect(() => {
    dispatch(setCardsForCurrQuiz(cardIds));
  }, [cardIds]);

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((_, i) => index !== i));
    setCardIds(cardIds.filter((_, i) => index !== i));
    cardsRef.current--;
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
    setCardIds(cardIds.concat(id));
    cardsRef.current++;
  };

  if (cards.length === 0 && cardsRef.current !== 0) {
    const id = nanoid();
    setCards(cards.concat({ front: "", back: "", id }));
    setCardIds(cardIds.concat(id));
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
