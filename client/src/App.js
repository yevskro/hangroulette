import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

class App extends Component{
  componentDidMount = () => {
    fetch(`/game`, {
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }})
      .then(response => console.log(response))  
  }
  render(){
    return(
      <div className="App">
        <h1> Hello, World!! </h1>
      </div>
    );
  }
}

export default hot(module)(App);