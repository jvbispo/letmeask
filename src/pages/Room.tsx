import { useEffect } from "react";
import { FormEvent, useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

type FirebaseQuestion = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Questions = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

export const Room = () => {
  const [question, setQuestion] = useState("");
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([])
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestion = databaseRoom.questions ?? {} as FirebaseQuestion;

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
      
    });
  });

  const handleSendQuestion = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if(question.trim() === '') {
      return 
    }

    if(!user) {
      throw new Error("You musta be logged in")
    }

    const newQuestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(newQuestion);

    setQuestion('');
  },[user, question, roomId])
  return (
    <div id="page-room">
      <header className="content">
        <img src={logoImg} alt="letmeask" />
        <RoomCode code={params.id}/>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && (<span>{question.length} perguntas</span>)}
        </div>

        <form onSubmit={e => handleSendQuestion(e)}>
          <textarea name="question" placeholder="O que você quer perguntar?" value={question} onChange={e => setQuestion(e.target.value)}/>

          <div className="form-footer">
            { user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>
            ) }
            <Button type="submit" disabled={!user}>Faça sua pergunta </Button>
          </div>
        </form>


      </main>
    </div>
  );
};
