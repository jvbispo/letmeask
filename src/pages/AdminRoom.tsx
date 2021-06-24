import { useParams } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { Question } from "../components/Question";
import { useRoom } from "../contexts/useRoom";

type RoomParams = {
  id: string;
};

export const AdminRoom = () => {

  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);


  return (
    <div id="page-room">
      <header className="content">
        <img src={logoImg} alt="letmeask" />
        <div>
          <RoomCode code={params.id} />
          <Button isOutlined>Encerrar sala</Button>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && <span>{questions.length} perguntas</span>}
        </div>

        <div className="question-list">
          {questions.map((question, i) => (
            <Question
              key={i}
              content={question.content}
              author={question.author}
            />
          ))}
        </div>
      </main>
    </div>
  );
};
