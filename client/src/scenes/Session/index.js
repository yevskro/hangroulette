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
        const objSessionId      = new SessionIdModel(this.props.cookies.get("sessionId"))
        const objGameGuesses    = new GuessesModel("loading", "")
        const objGame           = new GameModel(objGameGuesses, GAMESTATUS.LOADING)  
        const objScore          = new ScoreModel(0, 0)     
        const objSession        = new SessionModel(objSessionId, objScore, objGame)
        
        this.state = {
            objSession: objSession
        }
    }

    componentDidMount(){
        const jsonSession   = serviceSession.getSession(this.state.objSession.getObjSessionId().get())
        const objScore      = new ScoreModel(jsonSession.wins, jsonSession.losses)
        const objGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
        const objGame       = new GameModel(objGuesses, jsonSession.word)
        const objNewSession = new SessionModel(this.state.objSession.getObjSessionId(), objScore, objGame)

        this.setState = {
            objSession: objNewSession
        }
    }

    onGameGuess(guess){
        const jsonGuessStatus = serviceSession.postGuess(guess)

    }

    onGameNew(){
        const jsonSession   = serviceSession.getNewGame(this.state.objSession.getObjSessionId().get())
        const objScore      = new ScoreModel(jsonSession.wins, jsonSession.losses)
        const objGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
        const objGame       = new GameModel(objGuesses, jsonSession.word)
        const objNewSession = new SessionModel(this.state.objSession.getObjSessionId(), objScore, objGame)

        this.setState = {
            objSession: objNewSession
        }
    }

    render(){
        const id        = this.state.objSession.getObjSessionId().get()
        const objScore  = this.state.objSession.getObjScore()
        const objGame   = this.state.objSession.getObjGame()
        const guesses   = objGame.getGuesses()
        const word      = objGame.getWord()

        return <div>
                <SessionBoard id={id} wins={objScore.getWins()} losses={objScore.getLosses()}/>
                <GameClient guesses={guesses} word={word} onGameGuess={this.onGameGuess} onGameNew={this.onGameNew}/>
            </div>
    }
}

export default Session