import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Session from './scenes/Session'

const App = (props) => {
  return <div className="App">
          <Route exact path="/" component={Session} />
        </div>
};

export default App;