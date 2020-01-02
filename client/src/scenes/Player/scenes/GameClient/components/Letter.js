import React from 'react'
import "../../../../../styles/Letter.css"

const Letter = (props) => <div className={props.wrong ? "ltr clr--red" : "ltr"}>{props.letter}</div>

export default Letter