import React from 'react'

const Player = (props) => {
    let player, turn
    let className = "player"
    if(props.you){
        className += " you"
        player = (<React.Fragment>you</React.Fragment>)
    }
    else{
        player = (<React.Fragment>player{props.player}</React.Fragment>)
    }
    if(props.player === props.turn){
        turn = (<div className={"turn " + props.progress}>{props.seconds}</div>)
    }
    else{
        turn = (<div className={"turn " + props.progress}></div>)
    }
    return <div className={className}>{player}{turn}</div>
}

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
        list.push(<Player   player={i + 1} 
                            you={i + 1 === player}
                            turn={turn} 
                            progress={classGuessTime} 
                            seconds={seconds} 
                            key={i}/>)
    }

    return list
}

const Players = (props) => <div className="players">
                                {generatePlayers(props.player, props.players, props.turn, props.seconds)}
                            </div>

export default Players