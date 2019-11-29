import Error from "../helpers/error"

class GameModel {
    constructor(guesses, word){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.getGuesses = () => {
            return _guesses
        }

        this.getWord = () => {
            return _word
        }

        this.validateGuess = (guess) => {
            this.error.clear()
            const regOneLetter = /^[a-zA-Z]{1}$/

            if(!regOneLetter.test(guess)){
                this.error.set("guess must be one letter a-z")
            }

            return this
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
            let singleSpaced = word.split(" ").every(word => word !== "")

            if(!singleSpaced){
                this.error.set("single space only allowed")
            }

            return this
        }

        this.validateGuesses = (guesses) => {
            this.error.clear()
            const regCharSet = /^[a-zA-Z]/
            const regLengthAndCharSet = /^[a-zA-Z]{0,6}$/

            if(!regLengthAndCharSet.test(guesses.wrong)){
                this.error.set("invalid guesses: wrong")
                return this
            }

            if(!regCharSet.test(guesses.correct)){
                this.error.set("invalid guesses: correct")
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/
        let _guesses = {correct: "", wrong: ""}
        let _word = "" 


        this.error = new Error()

        if(guesses !== undefined && !this.validateGuesses(guesses).error.msg){
            _guesses = guesses
        }

        if(word !== undefined && !this.validateWord(word).error.msg){
            _word = word
        }

    }
}

export default GameModel