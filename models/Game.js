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
            /*
                game logic: 
                    when a player leaves all the player positions
                    will be shifted down by one, we need to handle
                    to whom the turn belongs after the shift.

                    if player leaving is in front of the turn
                    then the turn does not get effected, keep the turn
                    
                    if player leaving is in turn by keeping the turn
                    as is we technically shift it for the forward player 
                    who has been shifted down, however if the player
                    leaving is at the end of the list we need to transverse
                    the turn to the beginning at player position 1 to give the effect
                    of moving the turn to the next incoming player

                    if player leaving behind turn we need to
                    shift the turn by one to keep in sync with
                    newly shifted player positions
            */
            let newTurn = _turn /* left unchanged will justify player in front of turn and in turn */
            if(player === _turn){
                if(_players === player){ /* in turn and at the end */
                    newTurn = 1
                }
            }
            else if(player < _turn){ /* behind turn */
                --newTurn
            }
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