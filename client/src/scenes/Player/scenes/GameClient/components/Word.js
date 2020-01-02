import React from 'react'
import Letter from './Letter'
import "../../../../../styles/Word.css"

const EmptySpace        = ()        => <div></div>
const Bar               = ()        => <div className="wrd-grd__bar wrd-grd__bar--prmry"></div>
const WordGridItem      = (props)   => <div className="wrd-grd__itm"> 
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

const Word = (props) => <div className="wrd-grd">{generateWord(props.word, props.gameStatus)}</div>

export default Word