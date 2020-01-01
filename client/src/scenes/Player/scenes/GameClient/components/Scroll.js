import React, { Component } from 'react'
import svgSkull from '../../../../../../public/skull.svg'
import svgSmiley from '../../../../../../public/smiley.svg'
import '../../../../../styles/Scroll.css'

const ItemContentWrong      = (props) => <img className="scrl-itm-wrng" src={props.image}/>
const ItemContentCorrect    = (props) => <img className="scrl-itm-crct" src={props.image}/>
const ItemContent           = (props) => <span className="scrl-itm-cntnt" onClick={props.onClick}>{props.content}</span>
const Item                  = (props) => <div className={`scrl-itm scrl-itm-styl-1 flx--mdl ${props.size}`} style={props.top}>
                                        {props.content}
                                    </div>
const ScrollBody            = (props) => <div className="scrl-bdy jstfy--cntr">{props.items}</div>
const ScrollButton          = (props) => {
        let btn = "scrl-btn-up"
        if(props.down){
            btn = "scrl-btn-dwn"
        }
        return <div className="scrl-btn scrl-btn-styl-1 flx--mdl" onClick={props.onClick}>
                    <div className={`${btn} scrl-btn-up-red`}></div>
                </div>
}
                    

export default class Scroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r","s","t","u","v","w","x","y","z"],
            index: 0,
            odd: "scrl-itm-sml",
            even: "scrl-itm-big",
            top: 0,
            show: 5
        }
    }

    onUp = () => {
        if(this.state.top === 0){
            return
        }

        this.swapOddEvenSizes()

        const newTop = this.state.top + (18 * this.state.show)
        this.setState({
            top: newTop
        })
    }

    swapOddEvenSizes = () => {
        const currentOddIsSmall = this.state.odd === "scrl-itm-sml"
        const newOdd = currentOddIsSmall ? "scrl-itm-big" : "scrl-itm-sml"
        const newEven = currentOddIsSmall ? "scrl-itm-sml" : "scrl-itm-big"
        this.setState({
            odd: newOdd,
            even: newEven
        })
    }

    onDown = () => {
        if(this.state.top <= (this.state.items.length - this.state.show) * -18){
            return
        }

        this.swapOddEvenSizes()
        
        const newTop = this.state.top - (18 * this.state.show)
        this.setState({
            top: newTop
        })
    } 

    generateScrollItems = () => {
        const scrollItems = []
        for(let k = 0; k < this.state.items.length; k++){
            const top = {top: `${this.state.top}%`}
            const size = (k + 1) % 2 ? this.state.odd : this.state.even 
            let scrollItemContent = <ItemContent content={this.state.items[k]} onClick={this.props.onItemClick}/>
            if(this.props.skull.includes(this.state.items[k])){
                scrollItemContent = <ItemContentWrong image={svgSkull}/>
            }
            else if(this.props.smiley.includes(this.state.items[k])){
                scrollItemContent = <ItemContentCorrect image={svgSmiley}/>
            }
            scrollItems.push(<Item top={top} size={size} key={`item-${k}`} content={scrollItemContent}/>)
        }
        return scrollItems
    }       

    render(){
        return <div className="scrl flt--rght">
                    <ScrollButton onClick={this.onUp}/>
                    <ScrollBody items={this.generateScrollItems()}/>
                    <ScrollButton down={true} onClick={this.onDown}/>
            </div>
    }
}