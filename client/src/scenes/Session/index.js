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
            mdlSession
        }
    }

    createSessionFromJson(jsonSession){
        try{
            const mdlSessionId      = new SessionIdModel(jsonSession.sessionId)
            const mdlGameGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
            const mdlGame           = new GameModel(mdlGameGuesses, jsonSession.word, jsonSession.status)  
            const mdlScore          = new ScoreModel(jsonSession.wins, jsonSession.losses)   
            return new SessionModel(mdlSessionId, mdlScore, mdlGame)
        }
        catch(e){
            return this.createSessionFromJson(serviceSession.errorSession())
        }
    }

    componentDidMount(){
        const jsonSession   = serviceSession.getSession(this.props.cookies.get("sessionId"))
        const mdlSession    = this.createSessionFromJson(jsonSession)
        this.setState({mdlSession})
    }

    onGameGuess(guess){
        const jsonGuessStatus = serviceSession.postGuess(guess)

    }

    onGameNew(){
        const jsonSession   = serviceSession.getNewGame(this.state.mdlSession.id())
        const mdlSession    = this.createSessionFromJson(jsonSession)
        this.setState({mdlSession})
    }

    render(){
        const id            = this.state.mdlSession.id()
        const mdlScore      = this.state.mdlSession.mdlScore()
        const mdlGame       = this.state.mdlSession.mdlGame()
        const mdlGuesses    = mdlGame.mdlGuesses()
        const word          = mdlGame.word()
      
        return <div>
                <SessionBoard id={id} mdlScore={mdlScore}/>
                <GameClient mdlGuesses={mdlGuesses} word={word} onGameGuess={this.onGameGuess} onGameNew={this.onGameNew}/>
            </div>
    }
}

export default Session