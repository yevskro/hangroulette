import React from 'react'

const Session = (p) => 
    <div className="session-board">
        Game Room: {p.mdlSession.id()} Wins: {p.mdlSession.mdlScore().wins()} Losses: {p.mdlSession.mdlScore().losses()}
    </div>

export default Session