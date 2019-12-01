import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../models/Game'

/* TODO: clean up code and refactor components */

class GameClient extends Component{
    constructor(props){
        super(props)
        this.state = {
            turnSeconds: 12
        }
        console.log("Df")
    }

    componentDidMount(){
        if(this.props.mdlPlayers.players() > 1){
            this.turnTimer()
        }
    }

    turnTimer = () => {
        const incrementTimer = () => {
            this.setState({turnSeconds: this.state.turnSeconds-1})
            if(this.state.turnSeconds === 0){
                clearInterval(id)
            }
        }

        const id = setInterval(incrementTimer,1000)
    }

    onGuess = (e) => {
        this.props.mdlGuesses.validateGuess(e.target.innerHTML)
        this.props.onGuess(e.target.innerHTML)
    }

    onAddPlayer = () => {
        this.props.onAddPlayer()
    }

    newGameButton = () => {
        switch(this.props.gameStatus){
            case GAMESTATUS.LOADING:
            case GAMESTATUS.PLAYING:
                return <React.Fragment></React.Fragment>
            default:
                return <div><button onClick={this.props.onNew}>New Game</button></div>
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
        const newGameButton = this.newGameButton()
        
        return <div>
            GameClient {this.props.gameStatus}<br/>
            <label>{this.props.word}</label><br/>
            <div>{buttons}</div>
            {newGameButton}
            <div>Players:{this.props.mdlPlayers.players()}</div>
            <div>Turn:{this.props.mdlPlayers.turn()}</div>
            <div>SecondsForTurn:{this.state.turnSeconds}</div>
            <button onClick={this.props.onAddPlayer}>Add Player</button>
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