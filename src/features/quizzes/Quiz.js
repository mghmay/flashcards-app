import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Card from "../cards/Card";
import AddCards from "../../components/AddCards";
import ROUTES from "../../app/routes";

import { selectAllQuizzes, updateQuizCards } from "./quizzesSlice";
import {
  addCards,
  selectTempCardIds,
  clearTempCards
} from "../cards/cardSlice";

export default function Quiz() {
  const dispatch = useDispatch();
  const quizzes = useSelector(selectAllQuizzes);
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  const cardIds = useSelector(selectTempCardIds);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCards());
    dispatch(updateQuizCards({ quizId, cardIds }));
    dispatch(clearTempCards());
  };

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <AddCards />
        <button>Submit</button>
      </form>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
