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
        </div>
    }
}
export default GameClient