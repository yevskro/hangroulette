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

        this.nextTurn = () => {
            return turn % players + 1
        }

        this.removePlayer = (player) => {
            console.log(`remove players turn ${_turn} player ${player} with total players ${_players}`)
            let newTurn = _turn
            if(player === _turn){
                if(_players === player){
                    /* last player is leaving reset turn to the first player */
                    newTurn = 1
                }
                /*  
                    player leaving is not last, shift players by 1, but keep the turn position same because the next
                    player will be shifted to the turn position
                */
                //return new PlayersModel(_players - 1, _turn)
            }
            else if(player < _turn){
                --newTurn
            }
            /* player leaving is not in a turn, shift players by 1 and sync up turn */
            return new PlayersModel(_players - 1, newTurn)
        }

        this.validatePlayers = (players) => {
            if(typeof(players) !== 'number' || players < 0 || players > 3){
                throw new Error(`players must be an number between 0 and 3 {${players}}`)
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
                throw new Error(`turn{${turn}} is out of scope from players{${players}}`)
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