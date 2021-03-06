import NewTopicForm from "../../components/NewTopicForm";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../../app/routes";

import { selectAllTopics } from "./topicsSlice";
import { selectAllQuizzes } from "../quizzes/quizzesSlice";

export default function Topic() {
  const topics = useSelector(selectAllTopics);
  const quizzes = useSelector(selectAllQuizzes);
  let { topicId } = useParams();
  const topic = topics[topicId];
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <li className="quiz" key={quiz.quizId}>
            <Link to={ROUTES.quizRoute(quiz.quizId)}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
