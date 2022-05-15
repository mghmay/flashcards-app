import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";

import { selectAllQuizzes } from "./quizzesSlice";

export default function Quiz() {
  const quizzes = useSelector(selectAllQuizzes);
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  return (
    <section>
      <h1>{quiz.name}</h1>
      {console.log(quiz.cardIds)}
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <Card key={id} id={id} />
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
