import React, { Component} from "react";

class Intro extends Component {
    handleNewSession = () => {

    }
    handleSessionInput = () => {

    }
    render(){
        console.log("boo")
        return (
            <div>
                hello
                <form onSubmit={this.handleSessionInput}>
                    <input></input>
                </form>
                <form onSubmit={this.handleNewSession}>
                    <input></input>
                </form>
            </div>
        )
    }
}

export default Intro