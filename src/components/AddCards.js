import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectTempCards,
  addTempCardInputs,
  updateTempCards,
  removeTempCard,
} from "../features/cards/cardSlice";

const AddCards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(selectTempCards);
  const [addNewCards, setAddNewCards] = useState(false);

  const removeCard = (e, index) => {
    e.preventDefault();
    dispatch(removeTempCard(index));
  };

  const updateCardState = (index, side, value) => {
    dispatch(updateTempCards({ index, side, value }));
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    dispatch(addTempCardInputs());
  };

  if (addNewCards) {
    dispatch(addTempCardInputs());
    setAddNewCards(false);
  }

  return (
    <div>
      {addNewCards ? (
        <button onClick={() => setAddNewCards(true)}>Add cards</button>
      ) : (
        cards.map((_, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              required
              placeholder="Front"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              required
              placeholder="Back"
            />

            <div className="actions-container">
              <button
                onClick={(e) => removeCard(e, index)}
                value={cards[index].cardId}
                className="remove-card-button"
              >
                Remove Card
              </button>
            </div>
          </div>
        ))
      )}
      {addNewCards || <button onClick={addCardInputs}>Add a Card</button>}
    </div>
  );
};

export default AddCards;
