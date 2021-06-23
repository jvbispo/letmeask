import React, { FormEvent, useContext, useState } from "react";
import ilustrationImg from "../assets/illustration.svg";
import logoImg from "../assets/logo.svg";
import "../styles/auth.scss";
import { Button } from "../components/Button";
import { Link, useHistory } from "react-router-dom";
import {database} from '../services/firebase';
import { AuthContext } from "../contexts/AuthContext";


export const NewRoom = () => {
  const { user } = useContext(AuthContext);

  const [newRoom, setNewRoom] = useState('');

  const history = useHistory();

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">''
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
          <h2>Criar uma nova sala</h2>

          <form onSubmit={e => handleCreateRoom(e)}>
            <input type="text" placeholder="digite o nome da sala" value={newRoom} onChange={e => setNewRoom(e.target.value)}/>

            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
