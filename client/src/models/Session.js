import SessionIdModel from './SessionId'
import GameModel from './Game'
import Error from "../services/error"

class SessionModel {
    constructor(sessionIdObj, wins, losses, gameObj){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        win = () => {
            _wins += 1
            return this
        }

        loose = () => {
            _losses += 1
            return this
        }

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
        
        validateScoreNumber = (number) => {
            this.error.clear()
            if(typeof(number) !== "number"){
                this.error.set("not a number")
            }
            else if(number < 0){
                this.error.set("number must be 0 or positive")
            }

            return this
        }

        validateConstructorArguements = (objSessionId, wins, losses, objGame) => {
            this.error.clear()
            if(!(objSessionId instanceof SessionIdModel)){
                this.error.set("sessionIdObj must be an instace of SessionIdModel")
                return this
            }
    
            if(!(objGame instanceof GameModel)){
                this.error.set("gameObj must be an instance of GameModel")
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
        
        this.error = Error()

        if (this.validateConstructorArguements(objSessionId, wins, losses, objGame).error.msg){
            return this
        }

        let _wins = wins
        let _losses = losses
        let _objSessionId = objSessionId
        let _objGame = objGame
    }
}