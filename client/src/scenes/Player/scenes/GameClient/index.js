import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../../../models/Game'

/* TODO: clean up code and refactor components */

class GameClient extends Component{
    constructor(props){
        super(props)
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
                return <div><button onClick={this.props.onNext}>Next Game</button></div>
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
        const buttons           = this.guessButtons()
        const nextGameButton    = this.nextGameButton()
        const mdlGame           = this.props.mdlGame
        const mdlPlayers        = mdlGame.mdlPlayers()

        return <div>
            GameClient {mdlGame.gameStatus()}<br/>
            <label>{mdlGame.word()}</label><br/>
            <div>{buttons}</div>
            {nextGameButton}
            <div>Players:{mdlPlayers.players()}</div>
            <div>Turn:{mdlPlayers.turn()}</div>
            <div>SecondsForTurn:{mdlPlayers.seconds()}</div>
        </div>
    }
}

export default GameClient