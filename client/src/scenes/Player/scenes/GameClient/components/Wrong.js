import React from 'react'
import Letter from './Letter'

const WrongGridItem = (props) => <div className="wrong-guesses-grid-item">
                                   <Letter letter={props.letter} wrong={true}/>
                                 </div>

const generateWrongGuesses = (wrong) => {
    const wrongGuesses = []
    for(let i = 0; i < 6; i++){
        let letter = wrong[6 - (i + 1)] || ""
        wrongGuesses.push(<WrongGridItem key={`${6 - (i + 1)} ${letter}`} letter={letter}/>)
    }
    return wrongGuesses
}

const Wrong = (props) => <div className="wrong-guesses-grid">{generateWrongGuesses(props.guesses)}</div>

export default Wrong