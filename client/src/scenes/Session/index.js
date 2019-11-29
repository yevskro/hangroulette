import React, { Component } from 'react'
import SessionIdModel from '../../models/SessionId'

class Session extends Component {
    constructor(props){
        super(props)
        const sessionIdObj = new SessionIdModel(this.props.cookies.get("sessionId"))             
        this.state = {
            sessionObj: {sessionIdObj: sessionIdObj}
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