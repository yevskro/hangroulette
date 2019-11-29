import React, { Component } from 'react'
import SessionIdModel       from '../../models/SessionId'
import SessionModel         from '../../models/Session'
import GameModel            from '../../models/Game'
import serviceSession       from '../../services/session'
import SessionBoard         from './components/SessionBoard'
import GameClient           from './scenes/GameClient'

class Session extends Component {
    constructor(props){
        super(props)
        const objSessionId  = new SessionIdModel(this.props.cookies.get("sessionId"))
        const objGame       = new GameModel({correct: "loading", wrong: ""}, "loading")       
        const objSession    = new SessionModel(objSessionId, {wins: 0, losses: 0}, objGame)
        
        this.state = {
            objSession: objSession
        }
    }

    componentDidMount(){
        const jsonSession   = serviceSession.getSession(this.state.objSession.getObjSessionId().get())
        const score         = {wins: jsonSession.wins, losses: jsonSession.losses}
        const guesses       = {correct: jsonSession.correct, wrong: jsonSession.wrong}
        const objGame       = new GameModel(guesses, jsonSession.word)
        const objNewSession = new SessionModel(this.state.objSession.getObjSessionId(), score, objGame)

        this.setState = {
            objSession: objNewSession
        }
    }

    render(){
        const id        = this.state.objSession.getObjSessionId().get()
        const score     = this.state.objSession.getScore()
        const objGame   = this.state.objSession.getObjGame()
        const guesses   = objGame.getGuesses()
        const word      = objGame.getWord()

        return <div>
                <SessionBoard id={id} wins={score.wins} losses={score.losses}/>
                <GameClient guesses={guesses} word={word}/>
            </div>
    }
}

export default Session