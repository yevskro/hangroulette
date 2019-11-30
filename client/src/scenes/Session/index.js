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
        const jsonSession       = serviceSession.emptySession() 
        const mdlSession        = this.createSessionFromJson(jsonSession)
        
        this.state = {
            mdlSession: mdlSession,
            error: ""
        }
    }

    createSessionFromJson(jsonSession){
        const mdlSessionId      = new SessionIdModel(jsonSession.sessionId)
        const mdlGameGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
        const mdlGame           = new GameModel(mdlGameGuesses, jsonSession.word, jsonSession.status)  
        const mdlScore          = new ScoreModel(jsonSession.wins, jsonSession.losses)   
        return new SessionModel(mdlSessionId, mdlScore, mdlGame)       
    }

    componentDidMount(){
        try{
            const jsonSession   = serviceSession.getSession(this.props.cookies.get("sessionId"))
            const mdlNewSession = this.createSessionFromJson(jsonSession)

            this.setState({
                mdlSession: mdlNewSession
            })
        }
        catch(e){
            this.setState({
                error: "could not get session"
            })
        }
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
        const id            = this.state.mdlSession.mdlSessionId().id()
        const mdlScore      = this.state.mdlSession.mdlScore()
        const mdlGame       = this.state.mdlSession.mdlGame()
        const mdlGuesses    = mdlGame.mdlGuesses()
        const word          = mdlGame.word()
        const { error }     = this.state
        
        return <div>
                <SessionBoard id={id} mdlScore={mdlScore}/>
                <GameClient mdlGuesses={mdlGuesses} word={word} onGameGuess={this.onGameGuess} onGameNew={this.onGameNew}/>
                <div className="error">{error}</div>
            </div>
    }
}

export default Session