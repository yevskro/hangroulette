import React from 'react'

const Letter = (props) => <div className={props.wrong ? "letter wrong" : "letter"}>{props.letter}</div>

export default Letter