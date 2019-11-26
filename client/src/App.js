import React, { Component} from "react";
import { hot } from "react-hot-loader";
import { render } from "react-dom";
import { BrowserRouter, Route, Link, Switch } from  "react-router-dom";
import "./App.css";

const App = () => {
  <div className="App">
    <h1> Hello, World!! </h1>
  </div>
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default hot(module)(App);