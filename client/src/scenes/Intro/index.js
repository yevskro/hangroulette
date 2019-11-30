import React, { Component } from "react";
import SessionIdModel from '../../models/SessionId'
import Error            from './components/Error'
import FormSessionGet   from './components/FormSessionGet'
import FormSessionNew   from './components/FormSessionNew'

class Intro extends Component {
    constructor(props){
        super(props)
        const mdlSessionId = new SessionIdModel(this.props.cookies.get("sessionId"))
        
        this.state = {
            mdlSessionId,
            error: ""
        }    
    }

    handleSubmitNew = e => {
        e.preventDefault()
        this.props.history.push("/session")
    }

    handleSubmitSession = e => {
        e.preventDefault()
        const { mdlSessionId } = this.state
        this.props.cookies.set("sessionId", mdlSessionId.id())
        this.props.history.push(`/session`)
    }
    
    handleChangeSession = e => {
        try{
            const mdlNewSessionId = new SessionIdModel(e.target.value)
            this.setState({mdlSessionId: mdlNewSessionId})
        } 
        catch(e) {
            this.setState({error: "invalid sessionid input"})
        }
    }

    render(){
        const { mdlSessionId, 
                error }         = this.state
        const sessionId         = mdlSessionId.id()

        return (
            <div>
                <FormSessionGet submitValue="Continue Game" sessionId={sessionId} onSubmit={this.handleSubmitSession} handleChangeSession={this.handleChangeSession}/>
                <FormSessionNew submitValue="New Game" onSubmit={this.handleSubmitNew} />
                <Error error={error}/>
            </div>
        )
    }
}

export default Intro