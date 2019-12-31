/*<Players  player={this.props.id}
            players={mdlPlayers.players()}
            turn={mdlPlayers.turn()}
            seconds={this.props.seconds()}
/>*/

import React from 'react'

const generatePlayers = (player, players, turn, seconds) => {
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
        if(i + 1 === player){
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

const Players = (props) => <div className="players">
                                {generatePlayers(props.player, props.players, props.turn, props.seconds)}
                            </div>

export default Players