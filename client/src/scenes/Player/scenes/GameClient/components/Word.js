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
    /* 
        returns an array of WordGridItems that represent a char in the word
        and n EmptySpace to represent a space between words
    */
    return Array.prototype.map.call(word, (char, index) => {
        if(char === " "){
            return <EmptySpace key={`${index}  ${status}`}/>
        }
        const letter = char === '_' ? " " : char
        return <WordGridItem letter={letter} key={`${index}  ${status}`}/>
    })
}

const Word = (props) => <div className="wrd-grd">{generateWord(props.word, props.gameStatus)}</div>

export default Word