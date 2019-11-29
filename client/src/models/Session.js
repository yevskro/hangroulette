import SessionIdModel from './SessionId'

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

        getSessionIdObj = () => {
            return _sessionIdObj
        }

        getGameObj = () => {
            return _gameObj
        }
        
        validPositiveNumber = (number) => {
            this.errorMsg = ""
            if(typeof(number) !== "number"){
                this.errorMsg = "not a number"
            }
            else if(number < 0){
                this.errorMsg = "number must be positive"
            }

            return this
        }
        
        validateConstructorArguements = (sessionIdObj, wins, losses, gameObj) => {
            this.errorMsg = ""
            if(!(sessionIdObj instanceof SessionIdModel)){
                this.errorMsg = "sessionIdObj must be an instace of SessionIdModel"
                return this
            }
    
            if(!(gameObj instanceof gameObj)){
                this.errorMsg = "gameObj must be an instance of GameModel"
                return this
            }
    
            if(this.validPositiveNumber(wins).errorMsg){
                this.errorMsg += ": wins"
                return this
            }
    
            if(this.validPositiveNumber(losses).errorMsg){
                this.errorMsg += ": losses"
                return this
            }
            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        if (this.validateConstructorArguements(sessionIdObj, wins, losses, gameObj).errorMsg){
            return this
        }

        let _wins = wins
        let _losses = losses
        let _sessionIdObj = sessionIdObj
        let _gameObj = gameObj
    }
}