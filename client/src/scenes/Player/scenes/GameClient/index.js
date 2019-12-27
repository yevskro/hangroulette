import React, { Component } from 'react'
import { GAMESTATUS } from '../../../../../../models/Game'
import './game.css'
import Scroll from './components/Scroll'

/* TODO: clean up code and refactor components */

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    onGuess = (e) => {
        if(this.props.id === this.props.mdlGame.mdlPlayers().turn()){
            this.props.mdlGame.mdlGuesses().validateGuess(e.target.innerHTML)
            this.props.onGuess(e.target.innerHTML)
        }
    }

    nextGameButton = () => {
        switch(this.props.gameStatus){
            case GAMESTATUS.LOADING:
                return <React.Fragment></React.Fragment>
            default:
                return <div><button onClick={this.props.onNext}>Next Game</button></div>
        }
    }

    guessButtons = () => {
        /* Loop through ASCII codes 'a to z' = '97 to 122' */
        return [...Array(122-97)].map( (element, index) => {
            const char = String.fromCharCode(index + 97)
            return <button className="btn-guess" key={`guess-${char}`} onClick={this.onGuess}>{char}</button>
        })
    }
    
    generatePlayerList = (players, id, turn, seconds) => {
        const list = []
        let classGuessTime = ""
        if(seconds > 7){
            classGuessTime = "progress-good"
        }
        else if (seconds > 3){
            classGuessTime = "progress-caution"
        }
        else {
            classGuessTime = "progress-bad"
        }
        
        for(let i = 0; i < players; i++){
            if(i + 1 === id){
                list.push(<React.Fragment>you</React.Fragment>)
            }
            else{
                list.push(<React.Fragment>player{i+1}</React.Fragment>)
            }
            if(i + 1 === turn){
                list.push(<div className={"turn " + classGuessTime}>{seconds}</div>)
            }
            else{
                list.push(<div className={"turn " + classGuessTime}></div>)
            }
        }
        return list
    }

    generateWord(word, status){
        const letterContainers = []
        for(let i in word){
            if(word[i] === " "){
                letterContainers.push(<div></div>)
            }
            else{
                const container = []
                if(word[i] === ' '){
                    letterContainers.push(<div></div>)
                }
                else{
                    if(word[i] === '_'){
                        container.push(<div></div>)
                    }
                    else{
                        container.push(<div className="letter">{word[i]}</div>)
                    }
                    container.push(<div className="bar"></div>)
                    letterContainers.push(<div className="letter-container" key={i + ' ' + status}> 
                        {container}
                    </div>)
                }
            }
        }
        return letterContainers
    }

    generateLatency = (latency) => {
        if(latency < 100){
            return <div className="latency progress-good">{latency}ms</div>
        }
        else if(latency < 200){
            return <div className="latency progress-caution">{latency}ms</div>
        }
        
        return <div className="latency progress-bad">{latency}ms</div>
    }

    render(){
        const mdlGame           = this.props.mdlGame
        const mdlPlayers        = mdlGame.mdlPlayers()
        const mdlGuesses        = mdlGame.mdlGuesses()
        //{this.generateWord(this.props.mdlGame.word(), this.props.mdlGame.gameStatus())}
        return <div className='game'>
            <Scroll onItemClick={this.onGuess} skull={mdlGame.mdlGuesses().wrong()} smiley={mdlGame.mdlGuesses().correct()}/>
            {this.generateLatency(this.props.latency)}
            <div className="players">{this.generatePlayerList(mdlPlayers.players(), this.props.id, mdlPlayers.turn(), this.props.seconds)}</div>
            <div className="word-container">{this.generateWord(this.props.mdlGame.word(), this.props.mdlGame.gameStatus())}</div>
            <div className="findNextGame"><div className="right-arrow"></div>find next best available game</div>
        </div>
    }
}

export default GameClient