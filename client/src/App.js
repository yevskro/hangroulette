import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Player from './scenes/Player'

const App = (props) => {
  return <div className="App">
          <Route exact path="/" component={Player} />
        </div>
};

export default App;