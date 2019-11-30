import React, { Component } from 'react'

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    render(){
        const buttons = [...Array(122-97)].map( (element, index) => {
            const char = String.fromCharCode(index + 97)
            return <button className="btn-guess" value={char} key={`guess-${char}`}>{char}</button>
        })
        return <div>
            GameClient<br/>
            <label>{this.props.word}</label><br/>
            <div>{buttons}</div>
        </div>
    }
}
export default GameClient