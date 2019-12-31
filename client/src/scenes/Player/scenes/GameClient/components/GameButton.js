import React from 'react'

const GameButton = (props) => <div className="findNextGame" onClick={props.onClick}>
                                            <div className="right-arrow"></div>
                                            {props.title}
                                        </div>

export default GameButton