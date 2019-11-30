import SessionIdModel   from './SessionId'
import GameModel        from './Game'
import Error            from "../helpers/error"

export class ScoreModel {
    constructor(wins, losses){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.validateScoreNumber = (number) => {
            this.error.clear()
            if(typeof(number) !== "number"){
                this.error.set("not a number")
                return this
            }

            if(number < 0){
                this.error.set("number must be 0 or positive")
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
        this.error = new Error()

        if(this.validateScoreNumber(wins).error.msg){
            this.error.add(": wins")
            return this
        }

        if(this.validateScoreNumber(losses).error.msg){
            this.error.add(": losses")
            return this
        }

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
            this.error.clear()
            if(!(mdlGame instanceof GameModel)){
                this.error.set("game object must be an instance of GameModel")
                return this
            }
            return this
        } 

        this.validateConstructorArguements = (mdlSessionId, mdlScore, mdlGame) => {
            this.error.clear()
            if(!(mdlSessionId instanceof SessionIdModel)){
                this.error.set("sessionid object must be an instance of SessionIdModel")
                return this
            }

            if(this.validateGame(mdlGame).error.msg){
                return this
            }

            if(!(mdlScore instanceof ScoreModel)){
                this.error.set("objscore object must be an instance of ScoreModel")
                return this
            }

            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.error              = new Error()

        if (this.validateConstructorArguements(mdlSessionId, mdlScore, mdlGame).error.msg){
            return this
        }

        const _mdlScore         = mdlScore
        const _mdlSessionId     = mdlSessionId
        const _mdlGame          = mdlGame
    }
}
