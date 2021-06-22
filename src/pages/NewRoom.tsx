import React from 'react';
import ilustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import logoGoogle from '../assets/google-icon.svg';
import "../styles/auth.scss"
import { Button } from '../components/Button';

export const NewRoom = () => {
    return(
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="letmeask" />
                    <h2>Criar uma nova sala</h2>

                    <form action="">
                        <input
                         type="text"
                         placeholder="digite o nome da sala" 
                        />

                        <Button type='submit'>Criar sala</Button>
                    </form>
                    
                    <p>
                        Quer entrar em uma sala existente? <a href="#">Clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
};