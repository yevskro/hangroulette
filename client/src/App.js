import React, { Component} from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Game from '../scenes/Game'
import Intro from '../scenes/Intro'

const App = () => (
  <div className="App">
    <Route exact path="/" component={Game} />
    <Route exact path="/game" component={Intro} />
  </div>
);

export default App;