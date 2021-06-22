import React from "react";
import { Home, NewRoom } from "./pages";
import "./styles/global.scss";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact/>
      <Route component={NewRoom} path='/rooms/new' />
    </BrowserRouter>
  );
}

export default App;
