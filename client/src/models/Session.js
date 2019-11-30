import SessionIdModel   from './SessionId'
import GameModel        from './Game'
import Error            from "../helpers/error"

export class ScoreModel {
    constructor(wins, losses){
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

        this.getWins = () => {
            return wins
        }

        this.getLosses = () => {
            return losses
        }

        this.error = new Error()

        if(this.validateScoreNumber(wins).error.msg){
            this.error.add(": wins")
            return this
        }

        if(this.validateScoreNumber(losses).error.msg){
            this.error.add(": losses")
            return this
        }

        const _wins = wins
        const _losses = losses
    }
}

export default class SessionModel {
    constructor(objSessionId, objScore, objGame){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.getWins = () => {
            return _score.getWins()
        }

        this.getLosses = () => {
            return _score.getLosses()
        }

        this.getObjScore = () => {
            return _objScore
        }

        this.getObjSessionId = () => {
            return _objSessionId
        }

        this.getObjGame = () => {
            return _objGame
        }

        this.validateGame = (objGame) => {
            this.error.clear()
            if(!(objGame instanceof GameModel)){
                this.error.set("game object must be an instance of GameModel")
                return this
            }
            return this
        } 

        this.validateConstructorArguements = (objSessionId, objScore, objGame) => {
            this.error.clear()
            if(!(objSessionId instanceof SessionIdModel)){
                this.error.set("sessionid object must be an instance of SessionIdModel")
                return this
            }

            if(this.validateGame(objGame).error.msg){
                return this
            }

            if(!(objScore instanceof ScoreModel)){
                this.error.set("objscore object must be an instance of ScoreModel")
                return this
            }

            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.error              = new Error()

        if (this.validateConstructorArguements(objSessionId, objScore, objGame).error.msg){
            return this
        }

        const _objScore         = objScore
        const _objSessionId     = objSessionId
        const _objGame          = objGame
    }
}
