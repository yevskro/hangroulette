import React from 'react'

const Session = (p) => 
    <div className="SessionBoard">
        {p.id()} {p.mdlScore().wins()} {p.mdlScore().losses()}
    </div>

export default Session