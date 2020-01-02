import React from 'react'
import Letter from './Letter'
import "../../../../../styles/Wrong.css"

const WrongGridItem = (props) => <div className="wrng-gss-grd__itm wrng-gss-grd__itm--prmry">
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

const Wrong = (props) => <div className="wrng-gss-grd">{generateWrongGuesses(props.guesses)}</div>

export default Wrong