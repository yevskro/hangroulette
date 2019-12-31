import React from 'react'
import Letter from './Letter'

const EmptySpace        = ()        => <div></div>
const Bar               = ()        => <div className="bar"></div>
const WordGridItem      = (props)   => <div className="word-grid-item"> 
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
            letterContainers.push(<WordGridItem letter={letter} key={i + ' ' + status}/>)
        }
    }
    return letterContainers
}

const Word = (props) => <div className="word-grid">{generateWord(props.word, props.gameStatus)}</div>

export default Word