export const GAMESTATUS = {
    LOADING: 'loading',
    PLAYING: 'playing',
    LOST: 'lost',
    WON: 'won' 
}

export class GuessesModel {
    constructor(correct, wrong){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.validateGuess = (guess) => {
            const regOneLetter = /^[a-zA-Z]{1}$/

            if(!regOneLetter.test(guess)){
                throw new Error("guess must be one letter a-z")
            }
            return this
        }

        this.validateGuesses = (correct, wrong) => {
            const regCharSet            = /^[a-zA-Z]/
            const regLengthAndCharSet   = /^[a-zA-Z]{0,6}$/

            if(correct !== "" && !regCharSet.test(correct) || correct === undefined){
                throw new Error(`invalid guesses: correct{${correct}}`)
            }

            if(wrong !== "" && !regLengthAndCharSet.test(wrong) || wrong === undefined){
                throw new Error(`invalid guesses: wrong{${wrong}}`)
            }

            return this
        }

        this.correct = () => {
            return _correct
        }
        
        this.wrong = () => {
            return _wrong
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        this.validateGuesses(correct, wrong)
        
        const _correct = correct
        const _wrong = wrong
    }
} 

export class PlayersModel {
    constructor(players, turn){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.players = () => {
            return _players
        }
        this.turn = () => {
            return _turn
        }
        this.validatePlayers = (players) => {
            if(!(players instanceof Array)){
                throw new Error(`players must be an array{${players}}`)
            }
            if(players.length > 3){
                throw new Error(`maximum of 3 players allowed{${players}}`)
            }
            return this
        }

        this.validateTurn = (turn, players) => {
            if(typeof(turn) !== 'number'){
                throw new Error(`turn must be a number{${turn}}`)
            }
            if(turn < 0 || turn > players){
                throw new Error(`turn is out of scope from players{${turn}}`)
            }
            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        this.validateTurn(turn, this.validatePlayers(players))
        const _turn       = turn
        const _players    = players
    }
}

export default class GameModel {
    constructor(mdlGuesses, mdlPlayers, word, gameStatus){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.gameStatus = () => {
            return _gameStatus
        }

        this.mdlGuesses = () => {
            return _mdlGuesses
        }

        this.mdlPlayers = () => {
            return _mdlPlayers
        }

        this.players = () => {
            return _mdlPlayers.players()
        }

        this.turn = () => {
            return _mdlPlayers.turn()
        }

        this.word = () => {
            return _word
        }

        this.validateWord = (word) => {
            const regCharSet = /^[a-zA-Z\s_]/

            if(word !== "" && !regCharSet.test(word) || word === undefined){
                throw new Error(`invalid word{${word}}`)
            }

            return this.validateSingleSpaced(word)
        }

        this.validateSingleSpaced = (word) => {
            const singleSpaced = word.split(" ").every(word => word !== "")

            if(!singleSpaced){
                throw new Error(`single space only allowed in word{${word}}`)
            }

            return this
        }

        this.validateGameStatus = (gameStatus) => {
            switch(gameStatus){
                case GAMESTATUS.LOADING:
                    return this
                case GAMESTATUS.PLAYING:
                    return this
                case GAMESTATUS.WON:
                    return this
                case GAMESTATUS.LOST:
                    return this
                default:
                    throw new Error(`invalid gamestatus{${gameStatus}}`)
            }
        }

        this.validateMdlGuesses = (mdlGuesses) => {
            if(!(mdlGuesses instanceof GuessesModel)){
                throw new Error(`mdlGuesses must be an instance of GuessesModel{${mdlGuesses}}`)
            }
        }

        this.validateMdlPlayers = (mdlPlayers) => {
            if(!(mdlPlayers instanceof PlayersModel)){
                throw new Error(`mdlPlayers must be an instance of PlayersModel{${mdlPlayers}}`)
            }
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        this.validateMdlGuesses(mdlGuesses)
        const _mdlGuesses = mdlGuesses

        this.validateMdlPlayers(mdlPlayers)
        const _mdlPlayers = mdlPlayers
        
        this.validateWord(word)
        const _word = word

        this.validateGameStatus(gameStatus)
        const _gameStatus = gameStatus
    }
}