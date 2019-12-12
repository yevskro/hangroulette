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

        this.won = () => {
            return new ScoreModel(_wins + 1, _losses)   
        }

        this.lost = () => {
            return new ScoreModel(_wins, _losses + 1)
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
    constructor(id, mdlScore, mdlGame, seconds){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.jsonObj = () => {
            const mdlGuesses = _mdlGame.mdlGuesses()
            const obj = {
                id: _id, wins: this.wins(), losses: this.losses(),
                game: {
                    correct: mdlGuesses.correct(), wrong: mdlGuesses.wrong(),
                    word: _mdlGame.word(),
                    status: _mdlGame.gameStatus(),
                    players: _mdlGame.players(), turn: _mdlGame.turn() 
                },
                seconds: _seconds
            }
            return obj
        }

        this.seconds = () => {
            return _seconds
        }
        
        this.wins = () => {
            return _mdlScore.wins()
        }

        this.losses = () => {
            return _mdlScore.losses()
        }

        this.id = () => {
            return _id
        }

        this.player = () => {
            return _player
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

        this.validateConstructorArguements = (id, mdlScore, mdlGame) => {
            if(typeof(id) !== 'number'){
                throw new TypeError(`id must be a number {${id}}`)
            }

            if(id )
            this.validateGame(mdlGame)

            if(!(mdlScore instanceof ScoreModel)){
                throw new TypeError(`mdlScore object must be an instance of ScoreModel{${mdlScore}}`)
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        /* constructor must be initiated with all parameters met */
        
        this.validateConstructorArguements(id, mdlScore, mdlGame)
        const _mdlScore         = mdlScore
        const _mdlGame          = mdlGame
        const _id               = id
        const _seconds          = seconds
    }
}