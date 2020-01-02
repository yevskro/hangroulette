import React, { Component } from 'react'
import svgSkull from '../../../../../../public/skull.svg'
import svgSmiley from '../../../../../../public/smiley.svg'
import '../../../../../styles/Scroll.css'

const ItemContentWrong      = (props) => <img className="scrl__wrng" src={props.image}/>
const ItemContentCorrect    = (props) => <img className="scrl__crct" src={props.image}/>
const ItemContentText       = (props) => <span className="scrl__cntnt" onClick={props.onClick}>{props.text}</span>
const Item                  = (props) => <div className={`scrl__itm scrl__itm--prmry flx--mdl ${props.size}`} style={props.top}>
                                        {props.content}
                                    </div>
const ScrollBody            = (props) => <div className="scrl__bdy jstfy-cntnt--cntr">{props.items}</div>
const ScrollButton          = (props) => {
        let ptr = "scrl__ptr-up"
        if(props.down){
            ptr = "scrl__ptr-dwn"
        }
        return <div className="scrl__btn scrl__btn--prmry flx--mdl" onClick={props.onClick}>
                    <div className={`${ptr} clr--rd`}></div>
                </div>
}
                    

export default class Scroll extends Component{
    constructor(props){
        super(props)
        this.state = {
            items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q","r","s","t","u","v","w","x","y","z"],
            index: 0,
            odd: "scrl__itm--sml",
            even: "scrl__itm--big",
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
        const currentOddIsSmall = this.state.odd === "scrl__itm--sml"
        const newOdd = currentOddIsSmall ? "scrl__itm--big" : "scrl__itm--sml"
        const newEven = currentOddIsSmall ? "scrl__itm--sml" : "scrl__itm--big"
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

    itemContentForScroll = (letter) => {
        if(this.props.skull.includes(letter)){
            return <ItemContentWrong image={svgSkull}/>
        }
        if(this.props.smiley.includes(letter)){
            return <ItemContentCorrect image={svgSmiley}/>
        }
        return <ItemContentText text={letter} onClick={this.props.onItemClick}/>
    }

    generateScrollItems = (arr, count) => {
        if(count === this.state.items.length){
            return arr
        }
        
        const size = (count + 1) % 2 ? this.state.odd : this.state.even 
        const scrollItemContent = this.itemContentForScroll(this.state.items[count])
        arr.push(<Item top={{top: `${this.state.top}%`}} size={size} key={`item-${count}`} content={scrollItemContent}/>)

        return this.generateScrollItems(arr, count + 1)
    }       

    render(){
        return <div className="scrl flt--rght">
                    <ScrollButton onClick={this.onUp}/>
                    <ScrollBody items={this.generateScrollItems([],0)}/>
                    <ScrollButton down={true} onClick={this.onDown}/>
            </div>
    }
}