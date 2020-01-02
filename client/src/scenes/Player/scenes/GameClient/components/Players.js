import React from 'react'
import "../../../../../styles/Players.css"

const textForPlayer = (you, player) => {
    return you ? <React.Fragment>you</React.Fragment> : <React.Fragment>player{player}</React.Fragment>
}

const classesForPlayer = (you) => {
    return you ? "plyrs__plyr-you flx algn-itms--cntr" : "plyrs__plyr flx algn-itms--cntr"
}

const turnElementForPlayer = (player, turn, progress, seconds) => {
    return player === turn ? <div className={`plyrs__trn flx--mdl ${progress}`}>{seconds}</div> :
                                <div className={`plyrs__trn flx--mdl ${progress}`}></div>
}

const colorForSeconds = (seconds) => {
    if(seconds > 7){
        return "clr--grn"
    }
    else if (seconds > 3){
        return "clr--ylw"
    }
    return "clr--rd"
}

const Player = (props) => {
    const playerText = textForPlayer(props.you, props.player)
    const classes = classesForPlayer(props.you, props.player)
    const turnElement = turnElementForPlayer(props.player, props.turn, props.progress, props.seconds)
    return <li className={classes}>{playerText}{turnElement}</li>
}

const generatePlayers = (player, players, turn, seconds) => {
    const color = colorForSeconds(seconds)
    const generate = (arr, count) => {
        if(count === players){
            return arr
        }
        arr.push(<Player    player={count + 1} 
                            you={count + 1 === player}
                            turn={turn} 
                            progress={color} 
                            seconds={seconds} 
                            key={count}/>)
        return generate(arr, count + 1)
    }
    return generate([], 0)
}

const Players = (props) => <div className="plyrs-contnr plyrs-cntnr-styl-1 flx flt--rght algn-itms--cntr">
                                <ul className="plyrs__lst flx--row">
                                    {generatePlayers(props.player, props.players, props.turn, props.seconds)}
                                </ul>
                            </div>

export default Players