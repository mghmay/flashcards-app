import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAllQuizzes } from "./quizzesSlice";

import ROUTES from "../../app/routes";

export default function Quizzes() {
  const quizzes = useSelector(selectAllQuizzes);
  return (
    <section className="center">
      <h1>Quizzes</h1>
      <ul className="quizzes-list">
        {Object.values(quizzes).map((quiz) => (
          <Link key={quiz.quizId} to={ROUTES.quizRoute(quiz.quizId)}>
            <li className="quiz">{quiz.name}</li>
          </Link>
        ))}
      </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
