import React, { FormEvent, useState } from "react";
import ilustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import logoGoogle from "../assets/google-icon.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";



export const Home = () => {
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');
  function handleCreateRoom() {
    if(!user){
      signInWithGoogle();
    }

    history.push('/rooms/new');
  }

  async function handleJoinRoom(e: FormEvent) {
    e.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists');
      return;
    }

    history.push(`/rooms/${roomCode}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={ilustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />

          <Button onClick={handleCreateRoom} className="create-room">
            <img src={logoGoogle} alt="google logo" />
            Crie sua sala com o Google
          </Button>

          <div className="separator">ou entre em uma sala</div>

          <form onSubmit={e => handleJoinRoom(e)}>
            <input type="text" placeholder="digite o código da sala" value={roomCode} onChange={e => setRoomCode(e.target.value)}/>

            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
