import React, { useState } from "react";
import { useSelector } from "react-redux";

import { selectAllCards } from "./cardSlice";

export default function Card({ id }) {
  const cards = useSelector(selectAllCards);
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  return (
    <li>
      <button className="card" onClick={(e) => setFlipped(!flipped)}>
        {flipped ? card.back : card.front}
      </button>
    </li>
  );
}
