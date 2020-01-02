import React from 'react'
import "../../../../../styles/GameButton.css"

const GameButton = (props) => <div className="gm-btn gm-btn-styl-1 flx--mdl" onClick={props.onClick}>
                                            <div className="gm-btn-rght-arrw gm-btn-rght-arrw-red"></div>
                                            {props.title}
                                        </div>

export default GameButton