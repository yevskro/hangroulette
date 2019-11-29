import React, { Component } from 'react'
import SessionIdModel from '../../models/SessionId'
import SessionModel from '../../models/Session'
import GameModel from '../../models/Game'
import serviceSession from '../../services/session'

class Session extends Component {
    constructor(props){
        super(props)
        const objSessionId = new SessionIdModel(this.props.cookies.get("sessionId"))
        const objGame = new GameModel("", "")       
        const objSession = new SessionModel(objSessionId, 0, 0, objGame)

        this.state = {
            objSession: objSession
        }
    }

    componentDidMount(){
        const jsonSession = serviceSession.getSession(this.state.objSessionId.get())
        const objGame = new GameModel(jsonSession.guesses, jsonSession.word)

        this.setState = {
            objSession: objSession.setObjGame(objGame)
        }
    }

    render(){
        console.log(this.props)
        return <div>session</div>
        /* 
        
        <SessionBoard id={} wins={} losses={}/>
        <Game guesses={} word={} postGuess={f(guess)} gameOver={f(won)}/>

        */

    }
}

export default Session