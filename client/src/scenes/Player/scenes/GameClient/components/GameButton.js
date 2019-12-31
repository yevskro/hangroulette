import React from 'react'

const GameButton = (props) => <div className={props.name} onClick={props.onClick}>
                                            <div className="right-arrow"></div>
                                            {props.title}
                                        </div>

export default GameButton