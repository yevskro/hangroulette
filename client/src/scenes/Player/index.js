import React, { Component } from 'react'
import SessionIdModel       from '../../../../models/SessionId'
import SessionModel, { 
        ScoreModel 
        }                   from '../../../../models/Session'
import GameModel, { 
         GuessesModel,
         PlayersModel 
        }                   from '../../../../models/Game'
import serviceSession       from '../../services/session'
import Session              from './components/Session'
import GameClient           from './scenes/GameClient'

class Session extends Component {
    constructor(props){
        super(props)
        const jsonSession   = serviceSession.emptySession()
        const mdlSession    = this.createSessionFromJson(jsonSession)
        this.state = {
            mdlSession,
            playerId: 0
        }
    }

    componentDidMount(){
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        this.wsGameClient = new WebSocket('ws://127.0.0.1:5001');
        this.wsGameClient.onmessage = (msg) => {
            this.setStateFromJson(msg.data)
        }
    }

    createSessionFromJson = (json) => {
        try{
            const session           = JSON.parse(json)
            const mdlSessionId      = new SessionIdModel(session.sessionId)
            const mdlScore          = new ScoreModel(session.wins, session.losses) 
            const game              = session.game
            const mdlGameGuesses    = new GuessesModel(game.correct, game.wrong)
            const mdlPlayers        = new PlayersModel(game.players, game.turn, game.seconds)
            const mdlGame           = new GameModel(mdlGameGuesses, mdlPlayers, game.word, session.status)    
            return new SessionModel(mdlSessionId, mdlScore, mdlGame, session.player)
        }
        catch(e){
            return this.createSessionFromJson(serviceSession.errorSession())
        }
    }

    setStateFromJson = (json) => {
        const mdlSession = this.createSessionFromJson(json.session)
        const { playerId } = json
        this.setState({mdlSession, playerId})
    }

    onGameGuess = (guess) => {
        const string = JSON.stringify({action: {guess: `${guess}`}})
        this.state.webSocket.send(string)
    }

    onGameNext = () => {
        /*const jsonSession = serviceSession.getNewGame(this.state.mdlSession.id())
        this.setStateFromSessionJson(jsonSession)*/
    }

    render(){
        const mdlGame = this.state.mdlSession.mdlGame()
      
        return <div>
                <Session    session     ={this.state.mdlSession}/>

                <GameClient mdlGame     ={mdlGame}
                            playerId    ={this.playerId}
                            onGuess     ={this.onGameGuess} 
                            onNext      ={this.onGameNext}/>
            </div>
    }
}

export default Session