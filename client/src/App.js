import React from "react";
import { Route } from  "react-router-dom";
import "./App.css";
import Session from './scenes/Session'
import Intro from './scenes/Intro'
import { withCookies, useCookies } from 'react-cookie';

const App = () => {
  const [ cookies ] = useCookies()
  const sessionId = cookies.session || ""
 
  return <div className="App">
          <Route exact path="/" render={(props) => <Intro {...props} sessionId={sessionId}/>} />
          <Route exact path="/session" component={Session} />
        </div>
};

export default App;