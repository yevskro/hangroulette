import React from 'react'
import { ScoreModel } from '../../../models/Session'

const SessionBoard = (p) => 
    <div className="SessionBoard">
        {p.id} {p.score.getWins()} {p.score.getLosses()}
    </div>

export default SessionBoard