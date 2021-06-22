import React from "react";
import { Home, NewRoom } from "./pages";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import {firebase, auth} from './services/firebase'
export const AuthContext = createContext({} as AuthContextType);

type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => void;
}

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

function App() {
  const [user, setUser] = useState<UserType>();

  function signInWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.signInWithPopup(provider).then(res => {
      if(res.user) {
        const {displayName, photoURL, uid} = res.user;

        if (!displayName || !photoURL || !uid) {
            throw new Error("Missing information from google Account")
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        })
      }
    })

  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{user, signInWithGoogle}}>

      
      <Route component={Home} path='/' exact/>
      <Route component={NewRoom} path='/rooms/new' />
    
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
