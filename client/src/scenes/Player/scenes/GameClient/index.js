import React, { Component } from 'react'
import Scroll               from './components/Scroll'
import Search               from './components/Search'
import Latency              from './components/Latency'
import Players              from './components/Players'
import GameButton           from './components/GameButton'
import Main                 from './components/Main'
import Wrong                from './components/Wrong'
import Word                 from './components/Word'
import './game.css'
////import { GAMESTATUS } from '../../../../../../models/Game'

class GameClient extends Component{
    constructor(props){
        super(props)
    }

    onGuess = (e) => {
        if(this.props.mdlGame.gameStatus() === "playing" && this.props.id === this.props.mdlGame.mdlPlayers().turn()){
            this.props.mdlGame.mdlGuesses().validateGuess(e.target.innerHTML)
            this.props.onGuess(e.target.innerHTML)
        }
    }

    render(){
        const mdlGame           = this.props.mdlGame
        const mdlPlayers        = mdlGame.mdlPlayers()
        const mdlGuesses        = mdlGame.mdlGuesses()

        return <div className='game'>
                <Scroll onItemClick={this.onGuess} skull={mdlGame.mdlGuesses().wrong()} smiley={mdlGame.mdlGuesses().correct()}/>
                <Latency latency={this.props.latency}/>
                <Players    player={this.props.id}
                            players={mdlPlayers.players()}
                            turn={mdlPlayers.turn()}
                            seconds={this.props.seconds}
                />
                <Main>
                    <Wrong guesses={mdlGuesses.wrong()}/>
                    <Word word={this.props.mdlGame.word()} gameStatus={this.props.mdlGame.gameStatus()}/>
                </Main>
                <GameButton name="find-next-game" onClick={this.props.onNext} title="find next best available game"/>
                <Search status={this.props.search}/>
            </div>
    }
}

export default GameClient