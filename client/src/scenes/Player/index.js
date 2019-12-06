import React, { Component } from 'react'
import SessionModel, { 
        ScoreModel 
        }                   from '../../../../models/Session'
import GameModel, { 
         GuessesModel,
         PlayersModel 
        }                   from '../../../../models/Game'
import PlayerModel          from '../../../../models/Player'
import serviceSession       from '../../services/session'
import Session              from './components/Session'
import GameClient           from './scenes/GameClient'

class Player extends Component {
    constructor(props){
        super(props)
        const jsonSession   = serviceSession.emptySession()
        const mdlSession    = this.createSessionFromJson(jsonSession)
        const mdlPlayer     = new PlayerModel(0, mdlSession)

        this.state = {
            mdlPlayer: mdlPlayer 
        }
    }

    componentDidMount(){
        window.WebSocket    = window.WebSocket || window.MozWebSocket;
        this.wsGameClient   = new WebSocket('ws://127.0.0.1:5001');

        this.wsGameClient.onmessage = (msg) => {
            this.setStateFromJson(msg.data)
        }
    }

    createSessionFromJson = (json) => {
        //try{
            const objSession        = JSON.parse(json).session
            const mdlScore          = new ScoreModel(objSession.wins, objSession.losses) 
            const objGame           = objSession.game
            const mdlGameGuesses    = new GuessesModel(objGame.correct, objGame.wrong)
            const mdlPlayers        = new PlayersModel(objGame.players, objGame.turn, objGame.seconds)
            const mdlGame           = new GameModel(mdlGameGuesses, mdlPlayers, objGame.word, objGame.status)    
            return new SessionModel(objSession.id, mdlScore, mdlGame)
        //}
        //catch(e){
        //    return this.createSessionFromJson(serviceSession.errorSession())
        //}
    }

    setStateFromJson = (json) => {
        const mdlSession    = this.createSessionFromJson(json.player.session)
        const mdlPlayer     = new PlayerModel(json.player.id, mdlSession)
        this.setState({mdlPlayer})
    }

    onGameGuess = (guess) => {
        const string = JSON.stringify({action: {guess: `${guess}`}})
        this.wsGameClient.send(string)
    }

    onGameNext = () => {
        const string = JSON.stringify({action: {next: "game"}})
        this.wsGameClient.send(string)
    }

    render(){
        const mdlSession    = this.state.mdlPlayer.mdlSession()
        const mdlGame       = mdlSession.mdlGame()

        return <div>
                <Session    mdlSession  ={mdlSession}/>

                <GameClient mdlGame     ={mdlGame}
                            playerId    ={this.state.mdlPlayer.id()}
                            onGuess     ={this.onGameGuess} 
                            onNext      ={this.onGameNext}/>
            </div>
    }
}

export default Player