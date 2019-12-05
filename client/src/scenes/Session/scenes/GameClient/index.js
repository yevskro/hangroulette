import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../../../models/Game'

/* TODO: clean up code and refactor components */

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }

    onGuess = (e) => {
        this.props.mdlGuesses.validateGuess(e.target.innerHTML)
        this.props.onGuess(e.target.innerHTML)
    }

    nextGameButton = () => {
        switch(this.props.gameStatus){
            case GAMESTATUS.LOADING:
                return <React.Fragment></React.Fragment>
            default:
                return <div><button onClick={this.props.onNew}>Next Game</button></div>
        }
    }

    guessButtons = () => {
        /* Loop through ASCII codes 'a to z' = '97 to 122' */
        return [...Array(122-97)].map( (element, index) => {
            const char = String.fromCharCode(index + 97)
            return <button className="btn-guess" key={`guess-${char}`} onClick={this.onGuess}>{char}</button>
        })
    }
    render(){
        const buttons = this.guessButtons()
        const nextGameButton = this.nextGameButton()
        
        return <div>
            GameClient {this.props.gameStatus}<br/>
            <label>{this.props.word}</label><br/>
            <div>{buttons}</div>
            {nextGameButton}
            <div>Players:{this.props.mdlPlayers.players()}</div>
            <div>Turn:{this.props.mdlPlayers.turn()}</div>
            <div>SecondsForTurn:{this.props.mdlPlayers.seconds()}</div>
        </div>
    }
}
export default GameClient

/* 
    function timer(){
        let seconds = 0
        let id = 0
        
        function increment(){
            seconds++
            if(seconds === 12){
                clearInterval(id)
            }
        }

        return id = setInterval(increment,1000)
    }

    let x = 0
    function j(){
        return x = 1
    }
    console.log(j() + `x:${x}`)

    function a(x) {    // <-- function
        function b(y) { // <-- inner function
            return x + y; // <-- use variables from outer scope
        }
    return b(x);       // <-- you can even return a function.
    }
    console.log(a(3));

*/