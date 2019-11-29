import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Session from './scenes/Session'
import Intro from './scenes/Intro'
import { withCookies, useCookies } from 'react-cookie';

const App = (props) => {
  return <div className="App">
          <Route exact path="/" render={(p) => <Intro {...p} cookies={props.cookies}/>} />
          <Route exact path="/session" render={(p) => <Session {...p} cookies={props.cookies} />} />
        </div>
};

export default withCookies(App);