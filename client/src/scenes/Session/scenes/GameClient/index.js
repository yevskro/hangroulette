import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../models/Game'

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    onGuess = (e) => {
        this.props.mdlGuesses.validateGuess(e.target.innerHTML)
        this.props.onGuess(e.target.innerHTML)
    }

    newGameButton = () => {
        if(this.props.gameStatus === GAMESTATUS.PLAYING){
            return <div></div>
        }
        return <div><button onClick={this.props.onNew}>New Game</button></div>
    }

    guessButtons = () => {
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
        </div>
    }
}
export default GameClient