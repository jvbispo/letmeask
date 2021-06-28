import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import "../styles/room.scss";
import { Question } from "../components/Question";
import { useRoom } from "../contexts/useRoom";
import deleteImage from "../assets/delete.svg";
import checkImage from "../assets/check.svg";
import answerImage from "../assets/answer.svg";
import { useCallback } from "react";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

export const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();

  const { title, questions } = useRoom(roomId);

  const handleDeleteQuestion = useCallback(
    async (questionId: string) => {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    },
    [roomId]
  );

  const handleEndRoom = useCallback(async () => {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }, [roomId, history]);

  const handleHighlightQuestion = useCallback(
    async (idQuestion: string) => {
      await database.ref(`rooms/${roomId}/questions/${idQuestion}`).update({
        isHighlighted: true,
      });
    },
    [roomId]
  );

  const handleCheckQuestionAsAnswered = useCallback(
    async (idQuestion: string) => {
      await database.ref(`rooms/${roomId}/questions/${idQuestion}`).update({
        isAnswered: true,
      });
    },
    [roomId]
  );

  return (
    <div id="page-room">
      <header className="content">
        <img src={logoImg} alt="letmeask" />
        <div>
          <RoomCode code={params.id} />
          <Button isOutlined onClick={() => handleEndRoom()}>
            Encerrar sala
          </Button>
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
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {
                !question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={checkImage} alt="Dar destaque a pergunta" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img
                        src={answerImage}
                        alt="Marcar como pergunta respondida"
                      />
                    </button>
                  </>
                )
              }
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImage} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};
