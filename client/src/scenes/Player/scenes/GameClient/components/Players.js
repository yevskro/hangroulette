import React from 'react'
import "../../../../../styles/Players.css"

const Player = (props) => {
    let player, turn, className

    if(props.you){
        className = "lst__plyr-you flx algn-itms--cntr"
        player = (<React.Fragment>you</React.Fragment>)
    }
    else{
        className = "lst__plyr flx algn-itms--cntr"
        player = (<React.Fragment>player{props.player}</React.Fragment>)
    }
    if(props.player === props.turn){
        turn = (<div className={"lst__trn flx--mdl " + props.progress}>{props.seconds}</div>)
    }
    else{
        turn = (<div className={"lst__trn flx--mdl " + props.progress}></div>)
    }
    return <li className={className}>{player}{turn}</li>
}

const generatePlayers = (player, players, turn, seconds) => {
    const list = []
    let classGuessTime = ""
    if(seconds > 7){
        classGuessTime = "clr--grn"
    }
    else if (seconds > 3){
        classGuessTime = "clr--ylw"
    }
    else {
        classGuessTime = "clr--rd"
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

const Players = (props) => <div className="plyrs-contnr plyrs-cntnr-styl-1 flx flt--rght algn-itms--cntr">
                                <ul className="plyrs__lst flx--row">
                                    {generatePlayers(props.player, props.players, props.turn, props.seconds)}
                                </ul>
                            </div>

export default Players