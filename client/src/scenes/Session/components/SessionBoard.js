import React from 'react'
import { ScoreModel } from '../../../../../models/Session'

const SessionBoard = (p) => 
    <div className="SessionBoard">
        {p.id()} {p.mdlScore().wins()} {p.mdlScore().losses()}
    </div>

export default SessionBoard