import SessionIdModel from './SessionId'
import GameModel from './Game'
import Error from "../helpers/error"

class SessionModel {
    constructor(objSessionId, score, objGame){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.getWin = () => {
            return _score.wins
        }

        this.getLosses = () => {
            return _score.losses
        }

        this.getScore = () => {
            return _score
        }

        this.getObjSessionId = () => {
            return _objSessionId
        }

        this.getObjGame = () => {
            return _objGame
        }

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

        this.validateGame = (objGame) => {
            this.error.clear()
            if(!(objGame instanceof GameModel)){
                this.error.set("game object must be an instance of GameModel")
                return this
            }
            return this
        } 

        this.validateConstructorArguements = (objSessionId, score, objGame) => {
            this.error.clear()
            if(!(objSessionId instanceof SessionIdModel)){
                this.error.set("sessionid object must be an instance of SessionIdModel")
                return this
            }

            if(this.validateGame(objGame).error.msg){
                return this
            }

            if(this.validateScoreNumber(score.wins).error.msg){
                this.error.add(": wins")
                return this
            }
    
            if(this.validateScoreNumber(score.losses).error.msg){
                this.error.add(": losses")
                return this
            }
            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.error = new Error()

        if (this.validateConstructorArguements(objSessionId, score, objGame).error.msg){
            return this
        }

        let _score = score
        let _objSessionId = objSessionId
        let _objGame = objGame
    }
}

export default SessionModel