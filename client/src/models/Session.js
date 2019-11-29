import SessionIdModel from './SessionId'
import GameModel from './Game'
import Error from "../helpers/error"

class SessionModel {
    constructor(sessionIdObj, wins, losses, gameObj){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        getWin = () => {
            return _wins
        }

        getLosses = () => {
            return _losses
        }

        getObjSessionId = () => {
            return _objSessionId
        }

        getObjGame = () => {
            return _objGame
        }

        setObjGame = (objGame) => {
            if(!this.validateGame(objGame).error.msg){
                _objGame = objGame
            }
            return this
        }
        
        setWins = (wins) => {
            if(!this.validateScoreNumber(wins).error.msg){
                _wins = wins
            }
            return this
        }

        setLosses = (losses) => {
            if(!this.validateScoreNumber(losses).error.msg){
                _losses = losses
            }
            return this
        }

        validateScoreNumber = (number) => {
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

        validateGame = (objGame) => {
            this.error.clear()
            if(!(objGame instanceof GameModel)){
                this.error.set("game object must be an instance of GameModel")
                return this
            }
            return this
        } 

        validateConstructorArguements = (objSessionId, wins, losses, objGame) => {
            this.error.clear()
            if(!(objSessionId instanceof SessionIdModel)){
                this.error.set("sessionid object must be an instance of SessionIdModel")
                return this
            }

            if(this.validateGame(objGame).error.msg){
                return this
            }

            if(this.validateScoreNumber(wins).error.msg){
                this.error.add(": wins")
                return this
            }
    
            if(this.validateScoreNumber(losses).error.msg){
                this.error.add(": losses")
                return this
            }
            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.error = new Error()

        if (this.validateConstructorArguements(objSessionId, wins, losses, objGame).error.msg){
            return this
        }

        let _wins = wins
        let _losses = losses
        let _objSessionId = objSessionId
        let _objGame = objGame
    }
}

export default SessionModel