import React from 'react'

const Session = (p) => 
    <div className="SessionBoard">
        {p.mdlSession.id()} {p.mdlSession.mdlScore().wins()} {p.mdlSession.mdlScore().losses()}
    </div>

export default Session