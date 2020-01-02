import React from 'react'
import "../../../../../styles/Letter.css"

const Letter = (props) => <div className={props.wrong ? "ltr ltr-lrg ltr-wrng" : "ltr ltr-lrg"}>{props.letter}</div>

export default Letter