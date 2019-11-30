import Error from "../helpers/error"

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
            this.error.clear()
            const regCharSet            = /^[a-zA-Z]/
            const regLengthAndCharSet   = /^[a-zA-Z]{0,6}$/

            if(correct !== ""){
                console.log("wtf")
            }
            if(!regCharSet.test(correct)){
                this.error.set("invalid guesses: correct")
            }

            if(wrong !== "" || !regLengthAndCharSet.test(wrong)){
                this.error.set("invalid guesses: wrong")
                return this
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

        this.error = new Error()
        if(this.validateGuesses(correct, wrong).error.msg){
            return this
        }

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
            this.error.clear()
            const regCharSet = /^[a-zA-Z\s_]/

            if(!regCharSet.test(word)){
                this.error.set("invalid character")
                return this
            }

            return this.validateSingleSpaced(word)
        }

        this.validateSingleSpaced = (word) => {
            this.error.clear()
            const singleSpaced = word.split(" ").every(word => word !== "")

            if(!singleSpaced){
                this.error.set("single space only allowed")
            }

            return this
        }

        this.validateGameStatus = (gameStatus) => {
            this.error.clear()
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
                    this.error.msg = "gamestatus is invalid"
            }

            return this
        }
        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        this.error      = new Error()

        const _mdlGuesses = mdlGuesses

        if(word === undefined && this.validateWord(word).error.msg){
            return
        }

        const _word = word

        if(this.validateGameStatus(gameStatus).error.msg){
            return
        }

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