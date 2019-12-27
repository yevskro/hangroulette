import React, { Component } from 'react'
import svgSkull from '../../../../../../public/skull.svg'
import svgSmiley from '../../../../../../public/smiley.svg'

export default class Scroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r","s","t","u","v","w","x","y","z"],
            index: 0,
            odd: "scroll-item-small",
            even: "scroll-item-big",
            top: 0,
            show: 5
        }
    }

    onUp = () => {
        if(this.state.top === 0){
            return
        }
        let currentOdd = this.state.odd
        let newOdd, newEven
        if(currentOdd === "scroll-item-small"){
            newOdd = "scroll-item-big"
            newEven = "scroll-item-small"
        }
        else{
            newOdd = "scroll-item-small"
            newEven = "scroll-item-big"
        }
        const newTop = this.state.top + (18 * this.state.show)
        this.setState({
            top: newTop,
            odd: newOdd,
            even: newEven
        })
    }

    onDown = () => {
        if(this.state.top <= (this.state.items.length - this.state.show) * -18){
            return
        }
        const newTop = this.state.top - (18 * this.state.show)
        let currentOdd = this.state.odd
        let newOdd, newEven
        if(currentOdd === "scroll-item-small"){
            newOdd = "scroll-item-big"
            newEven = "scroll-item-small"
        }
        else{
            newOdd = "scroll-item-small"
            newEven = "scroll-item-big"
        }
        
        this.setState({
            top: newTop,
            odd: newOdd,
            even: newEven
        })
    } 

    generateScrollItems = () => {
        const scrollItems = []
        for(let k = 0; k < this.state.items.length; k++){
            const top = {top: `${this.state.top}%`}
            const size = (k + 1) % 2 ? this.state.odd : this.state.even 
            let scrollItemContent = this.state.items[k]
            console.log(this.props.smiley)
            if(this.props.skull.includes(this.state.items[k])){
                scrollItemContent = <img className="skull" src={svgSkull}/>
            }
            else if(this.props.smiley.includes(this.state.items[k])){
                scrollItemContent = <img className="smiley" src={svgSmiley}/>
            }
            scrollItems.push(<div className={"scroll-item " + size} style={top} key={`item-${k}`} onClick={this.props.onItemClick}><span className="scroll-item-content">{scrollItemContent}</span></div>)
        }
        return scrollItems
    }

    render(){
        return <div className="scroll">
                    <div className="scroll-up" onClick={this.onUp}><div className="scroll-up-arrow"></div></div>
                    <div className="scroll-body">
                        {this.generateScrollItems()}
                    </div>
                    <div className="scroll-down" onClick={this.onDown}><div className="scroll-down-arrow"></div></div>
                </div>
    }
}