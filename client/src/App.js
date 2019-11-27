import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Game from './scenes/Game'
import Intro from './scenes/Intro'

const App = () => (
  <div className="App">
    <Route exact path="/" component={Intro} />
    <Route exact path="/game" component={Game} />
  </div>
);

export default App;