import React from "react";
import { Route } from  "react-router-dom";
import Player from './scenes/Player'
import "../src/styles/Normalize.css";
import "../src/styles/Common.css";
import "../src/styles/App.css";

const App = (props) => {
  return <div className="app flx--mdl">
          <Route exact path="/" component={Player} />
        </div>
};

export default App;