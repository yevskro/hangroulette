import React from 'react'
import "../../../../../styles/GameButton.css"

const GameButton = (props) => <div className="gm-btn gm-btn clr--wht flx--mdl" onClick={props.onClick}>
                                            <div className="gm-btn__ptr clr--rd"></div>
                                            {props.title}
                                        </div>

export default GameButton