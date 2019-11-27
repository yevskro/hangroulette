import React, { Component} from "react";

class Intro extends Component {
    handleNewSession = e => {
        e.preventDefault()
        console.log("new session")
    }
    handleSessionInput = e => {
        e.preventDefault()
        debugger
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleSessionInput}>
                    <input placeholder="Session #"></input>
                    <br/>
                    <input type="submit" value="Continue Game"/>
                </form>
                <form onSubmit={this.handleNewSession}>
                    <input type="submit" value="New Game"/>
                </form>
            </div>
        )
    }
}

export default Intro