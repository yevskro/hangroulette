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
        const jsonSession = serviceSession.getSession(this.props.cookies.get("sessionId"))
        this.setStateFromSessionJson(jsonSession)
    }

    createSessionFromJson = (jsonSession) => {
        try{
            const mdlSessionId      = new SessionIdModel(jsonSession.sessionId)
            const mdlGameGuesses    = new GuessesModel(jsonSession.correct, jsonSession.wrong)
            const mdlPlayers        = new PlayersModel(jsonSession.players, jsonSession.turn, jsonSession.seconds)
            const mdlGame           = new GameModel(mdlGameGuesses, mdlPlayers, jsonSession.player, jsonSession.word, jsonSession.status)  
            const mdlScore          = new ScoreModel(jsonSession.wins, jsonSession.losses)   
            return new SessionModel(mdlSessionId, mdlScore, mdlGame)
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

    onGameAddPlayer = () => {
        const jsonSession = serviceSession.postAddPlayer()
        this.setStateFromSessionJson(jsonSession)
    }

    onGameNew = () => {
        const jsonSession = serviceSession.getNewGame(this.state.mdlSession.id())
        this.setStateFromSessionJson(jsonSession)
    }

    onGameGuessTimeout = () => {
        const jsonSession = serviceSession.postGuessTimeout()
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
                            onNew           ={this.onGameNew}
                            onAddPlayer     ={this.onGameAddPlayer}
                            onGuessTimeout  ={this.onGameGuessTimeout}/>
            </div>
    }
}

export default Session