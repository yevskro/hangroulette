import React from 'react'

const SessionBoard = (p) => 
    <div className="SessionBoard">
        {p.id} {p.wins} {p.losses}
    </div>

export default SessionBoard