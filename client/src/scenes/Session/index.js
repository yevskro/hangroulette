import React, { Component } from 'react'
import SessionIdModel       from '../../models/SessionId'
import SessionModel, { 
        ScoreModel 
        }                   from '../../models/Session'
import GameModel, { 
         GuessesModel, 
         GAMESTATUS 
        }                   from '../../models/Game'
import serviceSession       from '../../services/session'
import SessionBoard         from './components/SessionBoard'
import GameClient           from './scenes/GameClient'

class Session extends Component {
    constructor(props){
        super(props)
        const mdlSessionId      = new SessionIdModel(this.props.cookies.get("sessionId"))
        const mdlGameGuesses    = new GuessesModel("loading", "")
        const mdlGame           = new GameModel(mdlGameGuesses, GAMESTATUS.LOADING)  
        const mdlScore          = new ScoreModel(0, 0)     
        const mdlSession        = new SessionModel(mdlSessionId, mdlScore, mdlGame)
        
        this.state = {
            mdlSession: mdlSession
        }
    }

    componentDidMount(){/*
        const jsonSession   = serviceSession.getSession(this.state.objSession.getObjSessionId().get())
        const objScore      = new ScoreModel(jsonSession.wins, jsonSession.losses)
        const objGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
        const objGame       = new GameModel(objGuesses, jsonSession.word)
        const objNewSession = new SessionModel(this.state.objSession.getObjSessionId(), objScore, objGame)

        this.setState = {
            objSession: objNewSession
        }*/
    }

    onGameGuess(guess){
        const jsonGuessStatus = serviceSession.postGuess(guess)

    }

    onGameNew(){/*
        const jsonSession   = serviceSession.getNewGame(this.state.objSession.getObjSessionId().get())
        const objScore      = new ScoreModel(jsonSession.wins, jsonSession.losses)
        const objGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
        const objGame       = new GameModel(objGuesses, jsonSession.word)
        const objNewSession = new SessionModel(this.state.objSession.getObjSessionId(), objScore, objGame)

        this.setState = {
            mdlSession: mdlNewSession
        }*/
    }

    render(){
        const id            = this.state.mdlSession.getMdlSessionId().get()
        const mdlScore      = this.state.mdlSession.getMdlScore()
        const mdlGame       = this.state.mdlSession.getMdlGame()
        const mdlGuesses    = mdlGame.getGuesses()
        const word          = mdlGame.getWord()

        return <div>
                <SessionBoard id={id} score={mdlScore}/>
                <GameClient guesses={mdlGuesses} word={word} onGameGuess={this.onGameGuess} onGameNew={this.onGameNew}/>
            </div>
    }
}

export default Session