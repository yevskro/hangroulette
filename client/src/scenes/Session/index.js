import React, { Component } from 'react'
import SessionIdModel from '../../models/SessionId'
import SessionModel from '../../models/Session'
import GameModel from '../../models/Game'
import serviceSession from '../../services/session'

class Session extends Component {
    constructor(props){
        super(props)
        const objSessionId = new SessionIdModel(this.props.cookies.get("sessionId"))       
        const jsonSession = serviceSession.getSession(objSessionId.get())
        const objGame = new GameModel(jsonSession.guesses, jsonSession.word)
        const objSession = new SessionModel(objSessionId, jsonSession.wins, jsonSession.losses, objGame)
        
        this.state = {
            objSession: objSession
        }
    }

    componentDidMount(){
        // grab session and update state
    }

    render(){
        console.log(this.props)
        return <div>session</div>
    }
}

export default Session