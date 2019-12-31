import React from 'react'

const EmptySpace = () => <div></div>
const Letter = (props) => <div className="letter">{props.letter}</div>
const Bar = () => <div className="bar"></div>
const LetterContainer = (props) => <div className="letter-container"> 
                                        {props.letter === ' ' ? <EmptySpace/> : <Letter letter={props.letter}/>}
                                        <Bar/>
                                    </div>

const generateWord = (word, status) => {
    const letterContainers = []
    for(let i in word){
        if(word[i] === " "){
            letterContainers.push(<EmptySpace key={i + ' ' + status}/>)
        }
        else{
            let letter = word[i]
            if(word[i] === '_'){
                letter = " "
            }
            letterContainers.push(<LetterContainer letter={letter} key={i + ' ' + status}/>)
        }
    }
    return letterContainers
}

const Word = (props) => <div className="word-container">{generateWord(props.word, props.gameStatus)}</div>

export default Word