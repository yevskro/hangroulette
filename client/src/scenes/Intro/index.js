import React, { Component} from "react";
import sessionService from '../../services/session';
import cookie from 'react-cookie';

class Intro extends Component {
    constructor(props){
        super(props)
        this.state = {
            sessionId: this.props.sessionId
        }    
    }

    handleSubmitNew = e => {
        e.preventDefault()
        sessionService.newSession()
        this.props.history.push("/session")
    }

    handleSubmitSession = e => {
        e.preventDefault()
        sessionService.getSession()
        this.props.history.push("/session")
    }
    
    handleChangeSession = e => {
        this.setState({
            sessionId: e.target.value
        })
    }

    render(){
        const { sessionId } = this.state

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
            </div>
        )
    }
}

export default Intro