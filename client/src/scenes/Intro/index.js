import React, { Component} from "react";
import ValidateSession from '../../services/validate';
import sessionService from '../../services/session'

class Intro extends Component {
    constructor(props){
        super(props)
        this.state = {
            cookies: this.props.cookies,
            sessionId: this.props.cookies.get("sessionId") || "",
            errorMsg: ""
        }    
    }

    handleSubmitNew = e => {
        e.preventDefault()
        this.props.history.push("/session")
    }

    handleSubmitSession = e => {
        e.preventDefault()
        const { sessionId } = this.state
        const validation = ValidateSession.validateSession(sessionId)
        if(validation.errorMsg){
            this.setState(Object.assign({},this.state, {errorMsg: validation.errorMsg}))
            return      
        }

        const session = sessionService.getSession(sessionId)
        if(session.errorMsg){
            this.setState(Object.assign({},this.state, {errorMsg: validation.errorMsg}))
            return   
        }

        this.props.cookies.set("sessionId", sessionId)
        this.props.history.push({pathname: `/session`, state:{session: session}})
    }
    
    handleChangeSession = e => {
        this.setState({
            sessionId: e.target.value
        })
    }

    render(){
        const { sessionId, errorMsg } = this.state
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