import Error from "../helpers/error"

class GameModel {
    constructor(guesses, word){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        update = (guess, word) => {
            if(this.validateGuess(guess).error.msg || this.validateWord(word).error.msg){
                return this
            }

            _guesses += guess
            _word = word

            return this
        }

        validateGuess = (guess) => {
            this.error.clear()
            const regOneLetter = /^[a-zA-Z]{1}$/

            if(!regOneLetter.test(guess)){
                this.error.set("guess must be one letter a-z")
            }

            return this
        }

        validateWord = (word) => {
            this.error.clear()
            const regCharSet = /^[a-zA-Z] _/

            if(!regCharSet.test(word)){
                this.error.set("invalid character")
                return this
            }

            return this.validateSingleSpaced(word)
        }

        validateSingleSpaced = (word) => {
            this.error.clear()
            let singleSpaced = word.split(" ").every(word => word !== "")

            if(!singleSpaced){
                this.error.set("single space only allowed")
            }

            return this
        }

        validateGuesses = (guesses) => {
            this.error.clear()
            const regLengthAndCharSet = /^[a-zA-Z]{0,6}$/

            if(!regLengthAndCharSet.test(guesses)){
                this.error.set("invalid guesses")
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        let _guesses = ""
        let _word = "" 
        let error = new Error()

        if(guesses !== undefined && !validateGuesses(guesses).error.msg){
            _guesses = guesses
        }

        if(word !== undefined && !validateWord(word).error.msg){
            _word = word
        }

    }
}