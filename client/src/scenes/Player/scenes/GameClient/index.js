import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../../../models/Game'
import './game.css'
import Scroll from './components/Scroll'

/* TODO: clean up code and refactor components */

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    onGuess = (e) => {
        this.props.mdlGame.mdlGuesses().validateGuess(e.target.innerHTML)
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
        const mdlGame           = this.props.mdlGame
        const mdlPlayers        = mdlGame.mdlPlayers()

        return <div className='game'>
            <Scroll/>
            <div>Players:{mdlPlayers.players()}</div>
            <div>Turn:{mdlPlayers.turn()}</div>
            <div className="word-container">
                <div className="letter-container">
                    <div className="letter">y</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">e</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">v</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">g</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">e</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">n</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">i</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">y</div>
                    <div className="bar"></div>
                </div>
                <div></div>
                <div className="letter-container">
                    <div className="letter">i</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">s</div>
                    <div className="bar"></div>
                </div>
                <div></div>
                <div className="letter-container">
                    <div className="letter">a</div>
                    <div className="bar"></div>
                </div>
                <div></div>
                <div className="letter-container">
                    <div className="letter">g</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">o</div>
                    <div className="bar"></div>
                </div>
                <div className="letter-container">
                    <div className="letter">d</div>
                    <div className="bar"></div>
                </div>
            </div>
            <div className="findNextGame"><div className="right-arrow"></div>&nbsp;find next best available game</div>
        </div>
    }
}

export default GameClient