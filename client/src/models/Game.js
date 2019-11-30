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

export default class GameModel {
    constructor(mdlGuesses, word, gameStatus){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.mdlGuesses = () => {
            return _mdlGuesses
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
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        const _mdlGuesses = mdlGuesses

        this.validateWord(word)
        const _word = word

        this.validateGameStatus(gameStatus)
        const _gameStatus = gameStatus
    }
}

        /*
        this.validateGuess = (guess) => {
            this.error.clear()
            const regOneLetter = /^[a-zA-Z]{1}$/

            if(!regOneLetter.test(guess)){
                this.error.set("guess must be one letter a-z")
            }

            return this
        }*/