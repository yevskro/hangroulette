class GameModel {
    constructor(guesses, word){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        update = (guess, word) => {
            if(this.validateGuess(guess).errorMsg || this.validateWord(word).errorMsg){
                return this
            }
            
            _guesses += guess
            _word = word

            return this
        }

        validateGuess = (guess) => {
            const regOneLetter = /^[a-zA-Z]{1}$/
            this.errorMsg = ""

            if(!regOneLetter.test(guess)){
                this.errorMsg = "guess must be one letter a-z"
            }

            return this
        }

        validateWord = (word) => {
            const regCharSet = /^[a-zA-Z] _/
            this.errorMsg = ""

            if(!regCharSet.test(word)){
                this.errorMsg = "invalid character"
            }

            return this.validateSingleSpaced(word)
        }

        validateSingleSpaced = (word) => {
            this.errorMsg = ""
            let singleSpaced = word.split(" ").every(word => word !== "")

            if(!singleSpaced){
                this.errorMsg = "single space only allowed"
            }

            return this
        }

        validateGuesses = (guesses) => {
            this.errorMsg = ""
            const regLengthAndCharSet = /^[a-zA-Z]{0,6}$/

            if(!regLengthAndCharSet.test(guesses)){
                this.errorMsg = "invalid guesses"
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        let _guesses = ""
        let _word = "" 
        
        if(guesses !== undefined && !validateGuesses(guesses).errorMsg){
            _guesses = guesses
        }

        if(word !== undefined && !validateWord(word).errorMsg){
            _word = word
        }

    }
}