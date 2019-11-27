import React, { Component} from "react";

class Intro extends Component {
    handleNewSession = () => {

    }
    handleSessionInput = () => {

    }
    render(){
        return (
            <div>
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