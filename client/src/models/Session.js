import SessionIdModel   from './SessionId'
import GameModel        from './Game'

export class ScoreModel {
    constructor(wins, losses){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.validateScoreNumber = (number) => {
            if(typeof(number) !== "number"){
                throw new Error(`invalid score{${number}}`)
            }

            if(number < 0){
                throw new Error(`score must be 0 or positive{${number}}`)
            }

            return this
        }

        this.wins = () => {
            return _wins
        }

        this.losses = () => {
            return _losses
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        this.validateScoreNumber(wins)
        this.validateScoreNumber(losses)
        const _wins     = wins
        const _losses   = losses
    }
}

export default class SessionModel {
    constructor(mdlSessionId, mdlScore, mdlGame){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.wins = () => {
            return _mdlScore.wins()
        }

        this.losses = () => {
            return _mdlScore.losses()
        }

        this.id = () => {
            return this.mdlSessionId().id()
        }

        this.mdlScore = () => {
            return _mdlScore
        }

        this.mdlSessionId = () => {
            return _mdlSessionId
        }

        this.mdlGame = () => {
            return _mdlGame
        }

        this.validateGame = (mdlGame) => {
            if(!(mdlGame instanceof GameModel)){
                throw new Error(`game object must be an instance of GameModel{${mdlGame}}`)
            }
            return this
        } 

        this.validateConstructorArguements = (mdlSessionId, mdlScore, mdlGame) => {
            if(!(mdlSessionId instanceof SessionIdModel)){
                throw new Error(`sessionid object must be an instance of SessionIdModel{${mdlSessionId}}`)
            }

            this.validateGame(mdlGame)

            if(!(mdlScore instanceof ScoreModel)){
                throw new Error(`objscore object must be an instance of ScoreModel{${mdlScore}}`)
            }

            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.validateConstructorArguements(mdlSessionId, mdlScore, mdlGame)
        
        const _mdlScore         = mdlScore
        const _mdlSessionId     = mdlSessionId
        const _mdlGame          = mdlGame
    }
}
