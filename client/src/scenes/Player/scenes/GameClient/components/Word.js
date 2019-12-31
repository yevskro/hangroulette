import React from 'react'

const generateWord = (word, status) => {
    const letterContainers = []
    for(let i in word){
        if(word[i] === " "){
            letterContainers.push(<div></div>)
        }
        else{
            const container = []
            if(word[i] === ' '){
                letterContainers.push(<div></div>)
            }
            else{
                if(word[i] === '_'){
                    container.push(<div></div>)
                }
                else{
                    container.push(<div className="letter">{word[i]}</div>)
                }
                container.push(<div className="bar"></div>)
                letterContainers.push(<div className="letter-container" key={i + ' ' + status}> 
                    {container}
                </div>)
            }
        }
    }
    return letterContainers
}

const Word = (props) => <div className="word-container">{generateWord(props.word, props.gameStatus)}</div>

export default Word