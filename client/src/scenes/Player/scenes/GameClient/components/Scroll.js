import React, { Component } from 'react'

export default class Scroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r","s","t","u","v","w","x","y","z"],
            index: 0,
            show: 5
        }
    }

    onUp = () => {
        if(this.state.index - this.state.show + 1 >= 0){
            this.setState({
                index: this.state.index - this.state.show
            })
        }
    }

    onDown = () => {
        if(this.state.index + this.state.show < this.state.items.length){
            this.setState({
                index: this.state.index + this.state.show
            })
        }
    } 

    generateScrollItems = () => {
        let endPoint = this.state.index + this.state.show
        if(endPoint > this.state.items.length){
            endPoint = this.state.index + (this.state.items.length - this.state.index)
        }
        const scrollItems = []
        for(let k = this.state.index; k < endPoint; k++){
            scrollItems.push(<div className="scroll-item" key={`item-${k}`} onClick={this.props.onItemClick}><span className="scroll-item-content">{this.state.items[k]}</span></div>)
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