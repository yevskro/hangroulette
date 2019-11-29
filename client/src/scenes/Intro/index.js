import React, { Component } from "react";
import SessionIdModel from '../../models/SessionId'
import Error from './components/Error'
import FormSessionGet from './components/FormSessionGet'
import FormSessionNew from './components/FormSessionNew'

class Intro extends Component {
    constructor(props){
        super(props)
        const sessionIdObj = new SessionIdModel(this.props.cookies.get("sessionId"))
        
        this.state = {
            cookies: this.props.cookies,
            sessionIdObj: sessionIdObj,
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
        const { error }  = sessionIdObj
        const sessionId = sessionIdObj.getId()

        return (
            <div>
                <FormSessionGet submitValue="Continue Game" sessionId={sessionId} onSubmit={this.handleSubmitSession} handleChangeSession={this.handleChangeSession}/>
                <FormSessionNew submitValue="New Game" onSubmit={this.handleSubmitNew} />
                <Error errorMsg={error.msg}/>
            </div>
        )
    }
}

export default Intro