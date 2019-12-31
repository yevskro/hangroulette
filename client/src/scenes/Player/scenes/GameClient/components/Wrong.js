import React from 'react'

const generateWrongGuesses = (wrong) => {
    const wrongGuesses = []
    for(let i = 0; i < 6; i++){
        wrongGuesses.push(<div className="wrong-guesses-grid-item">
            <div className="letter wrong" key={wrong[6 - (i + 1)] + ' wrong'}>{wrong[6 - (i + 1)] || ""}</div>
        </div>)
    }
    return wrongGuesses
}

const Wrong = (props) => <div className="wrong-guesses-grid">{generateWrongGuesses(props.guesses)}</div>

export default Wrong