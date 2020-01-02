import React from 'react'
import Letter from './Letter'
import "../../../../../styles/Wrong.css"

const WrongGridItem = (props) => <div className="wrng-gss-grd__itm wrng-gss-grd__itm--prmry">
                                   <Letter letter={props.letter} wrong={true}/>
                                 </div>

const generateWrongGuesses = (items, count, guesses, totalGuesses) => {
    if(count === totalGuesses){
        return items
    }
    const letter = guesses[totalGuesses - (count + 1)] || ""
    items.push(<WrongGridItem key={`${totalGuesses - (count + 1)} ${letter}`} letter={letter}/>)
    return generateWrongGuesses(items, count + 1, guesses, totalGuesses)
}

const Wrong = (props) => <div className="wrng-gss-grd">{generateWrongGuesses([], 0, props.guesses, props.totalGuesses)}</div>

export default Wrong