import React, { Component} from "react";
import sessionService from '../../services/session'
import SessionIdModel from './models/SessionId'

class Intro extends Component {
    constructor(props){
        super(props)
        const sessionIdObj = new SessionIdModel(this.props.cookies.get("sessionId"))
        
        this.state = {
            cookies: this.props.cookies,
            sessionIdObj: sessionIdObj,
            errorMsg: ""
        }    
    }

    handleSubmitNew = e => {
        e.preventDefault()
        this.props.history.push("/session")
    }

    handleSubmitSession = e => {
        e.preventDefault()
        const { sessionIdObj } = this.state
        this.props.cookies.set("sessionId", sessionIdObj.getId())
        this.props.history.push(`/session`)
    }
    
    handleChangeSession = e => {
        this.setState({sessionIdObj: this.state.sessionIdObj.setId(e.target.value)})
    }

    render(){
        const { sessionIdObj } = this.state
        const { errorMsg } = sessionIdObj
        const sessionId = sessionIdObj.getId()

        return (
            <div>
                <form onSubmit={this.handleSubmitSession}>
                    <input value={sessionId} placeholder="Session #" onChange={this.handleChangeSession}></input>
                    <br/>
                    <input type="submit" value="Continue Game"/>
                </form>
                <form onSubmit={this.handleSubmitNew}>
                    <input type="submit" value="New Game"/>
                </form>
                <div className="error">{errorMsg}</div>
            </div>
        )
    }
}

export default Intro