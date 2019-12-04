import React, { Component } from 'react'
import SessionIdModel       from '../../models/SessionId'
import SessionModel, { 
        ScoreModel 
        }                   from '../../models/Session'
import GameModel, { 
         GuessesModel,
         PlayersModel 
        }                   from '../../models/Game'
import serviceSession       from '../../services/session'
import SessionBoard         from './components/SessionBoard'
import GameClient           from './scenes/GameClient'

class Session extends Component {
    constructor(props){
        super(props)
        const jsonSession   = serviceSession.emptySession() 
        const mdlSession    = this.createSessionFromJson(jsonSession)
        
        this.state = {
            mdlSession
        }
    }

    componentDidMount(){
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        const connection = new WebSocket('ws://127.0.0.1:5001');
        connection.onmessage = (msg) => {
            this.setStateFromSessionJson(msg.data)
        }
    }

    createSessionFromJson = (jsonSession) => {
        try{
            const session           = JSON.parse(jsonSession)
            const mdlSessionId      = new SessionIdModel(session.sessionId)
            const mdlGameGuesses    = new GuessesModel(session.correct, session.wrong)
            const mdlPlayers        = new PlayersModel(session.players, session.turn, session.seconds)
            const mdlGame           = new GameModel(mdlGameGuesses, mdlPlayers, session.word, session.status)  
            const mdlScore          = new ScoreModel(session.wins, session.losses)   
            return new SessionModel(mdlSessionId, mdlScore, mdlGame, session.player)
        }
        catch(e){
            return this.createSessionFromJson(serviceSession.errorSession())
        }
    }

    setStateFromSessionJson = (jsonSession) => {
        const mdlSession = this.createSessionFromJson(jsonSession)
        this.setState({mdlSession})
    }

    onGameGuess = (guess) => {
        const jsonSession = serviceSession.postWinGuess(guess)
        this.setStateFromSessionJson(jsonSession)
    }

    onGameNew = () => {
        const jsonSession = serviceSession.getNewGame(this.state.mdlSession.id())
        this.setStateFromSessionJson(jsonSession)
    }

    render(){
        const id            = this.state.mdlSession.id()
        const mdlScore      = this.state.mdlSession.mdlScore()
        const mdlGame       = this.state.mdlSession.mdlGame()
        const mdlPlayers    = mdlGame.mdlPlayers()
        const mdlGuesses    = mdlGame.mdlGuesses()
        const word          = mdlGame.word()
      
        return <div>
                <SessionBoard id        ={id}
                              mdlScore  ={mdlScore}/>

                <GameClient gameStatus      ={mdlGame.gameStatus()} 
                            mdlGuesses      ={mdlGuesses} 
                            mdlPlayers      ={mdlPlayers} 
                            word            ={word} 
                            onGuess         ={this.onGameGuess} 
                            onNew           ={this.onGameNew}/>
            </div>
    }
}

export default Session

/*

class j{
    b(){
        console.log(this)
    }
}

function k(b){
    b()
}

let a = new j()

k(a.b)
*/