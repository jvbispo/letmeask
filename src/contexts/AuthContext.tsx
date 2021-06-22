import React, { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';


type AuthContextType = {
  user: UserType | undefined;
  signInWithGoogle: () => Promise<void>;
};

type UserType = {
  id: string;
  name: string;
  avatar: string;
};

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthProviderProps) {
  const [user, setUser] = useState<UserType>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const res = await auth.signInWithPopup(provider);

    if (res.user) {
      const { displayName, photoURL, uid } = res.user;

      if (!displayName || !photoURL || !uid) {
        throw new Error("Missing information from google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL || !uid) {
          throw new Error("Missing information from google Account");
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}> 
      {props.children}
    </AuthContext.Provider>
  )
}