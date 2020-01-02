import React from 'react'
import Letter from './Letter'
import "../../../../../styles/Wrong.css"

const WrongGridItem         = (props) => <div className="wrng-gss-grd__itm wrng-gss-grd__itm--prmry">
                                   <Letter letter={props.letter} wrong={true}/>
                                 </div>

const generateWrongGuesses  = (guesses, totalGuesses) => {
    /* returns an array of WrongGridItems */
    const generate = (arr, count) => {
        if(count === totalGuesses){
            return arr
        }
        const letter = guesses[totalGuesses - (count + 1)] || ""
        arr.push(<WrongGridItem key={`${totalGuesses - (count + 1)} ${letter}`} letter={letter}/>)
        return generate(arr, count + 1)
    }

    return generate([], 0)
}

const Wrong = (props) => <div className="wrng-gss-grd">{generateWrongGuesses(props.guesses, props.totalGuesses)}</div>

export default Wrong