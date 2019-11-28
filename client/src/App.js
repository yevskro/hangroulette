import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Session from './scenes/Session'
import Intro from './scenes/Intro'
import { withCookies, useCookies } from 'react-cookie';

<<<<<<< HEAD
const App = () => (
  <div className="App">
    <Route exact path="/" component={Intro} />
    <Route exact path="/game" component={Game} />
  </div>
);
=======
const App = (props) => {
  return <div className="App">
          <Route exact path="/" render={(p) => <Intro {...p} cookies={props.cookies}/>} />
          <Route exact path="/session" component={Session} />
        </div>
};
>>>>>>> intro

export default withCookies(App);