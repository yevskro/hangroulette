import React, { Component } from 'react'

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
        /*let endPoint = this.state.index + this.state.show
        if(endPoint > this.state.items.length){
            endPoint = this.state.index + (this.state.items.length - this.state.index)
        }*/

        //let k = this.state.index
        const scrollItems = []
        for(let k = 0; k < this.state.items.length; k++){
            const top = {top: `${this.state.top}%`}
            const size = (k + 1) % 2 ? this.state.odd : this.state.even 
            scrollItems.push(<div className={"scroll-item " + size} style={top} key={`item-${k}`} onClick={this.props.onItemClick}><span className="scroll-item-content">{this.state.items[k]}</span></div>)
        }
        return scrollItems
    }

    render(){
        //const scrollItems = this.generateScrollItems()
        return <div className="scroll">
                    <div className="scroll-up" onClick={this.onUp}><div className="scroll-up-arrow"></div></div>
                    <div className="scroll-body">
                        {this.generateScrollItems()}
                    </div>
                    <div className="scroll-down" onClick={this.onDown}><div className="scroll-down-arrow"></div></div>
                </div>
    }
}