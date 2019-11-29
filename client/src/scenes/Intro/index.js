import React, { Component } from "react";
import SessionIdModel from '../../models/SessionId'
import Error            from './components/Error'
import FormSessionGet   from './components/FormSessionGet'
import FormSessionNew   from './components/FormSessionNew'

class Intro extends Component {
    constructor(props){
        super(props)
        const objSessionId = new SessionIdModel(this.props.cookies.get("sessionId"))
        
        this.state = {
            cookies: this.props.cookies,
            objSessionId: objSessionId,
        }    
    }

    handleSubmitNew = e => {
        e.preventDefault()
        this.props.history.push("/session")
    }

    handleSubmitSession = e => {
        e.preventDefault()
        const { objSessionId } = this.state
        this.props.cookies.set("sessionId", objSessionId.get())
        this.props.history.push(`/session`)
    }
    
    handleChangeSession = e => {
        const objNewSessionId = new SessionIdModel(e.target.value)
        this.setState({objSessionId: objNewSessionId})
    }

    render(){
        const { objSessionId }  = this.state
        const { error }         = objSessionId
        const sessionId         = objSessionId.get()

        return (
            <div>
                <FormSessionGet submitValue="Continue Game" sessionId={sessionId} onSubmit={this.handleSubmitSession} handleChangeSession={this.handleChangeSession}/>
                <FormSessionNew submitValue="New Game" onSubmit={this.handleSubmitNew} />
                <Error error={error.msg}/>
            </div>
        )
    }
}

export default Intro