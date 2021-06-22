import React from "react";
import { Home, NewRoom } from "./pages";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";

import { AuthContextProvider } from "./contexts/AuthContext";



function App() {


  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route component={Home} path="/" exact />
        <Route component={NewRoom} path="/rooms/new" />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
