import GameModel, { GAMESTATUS, GuessesModel } from '../Game'

export default class ServerGameModel extends GameModel{
    static convertWordToHidden(word){
        let hiddenWord = ""
        for(const char in word){
            if(char !== ' '){
                hiddenWord += "_"
            }
            else{
                hiddenWord += " "
            }
        }
        return hiddenWord
    }

    constructor(mdlGuesses, mdlPlayers, hiddenWord, gameStatus, serverWord){
        /* convert word to hidden word for the client */
        super(mdlGuesses, mdlPlayers, hiddenWord, gameStatus)
        this.guess = (guess) => {
            /* undefined is to be understood as a malicious data attempt */
            try{
                mdlGuesses.validateGuess(guess)
            }
            catch(e){
                return undefined 
            }

            if(gameStatus !== GAMESTATUS.PLAYING){
            /* client should know not to send a guess if the game is over */
                return undefined
            }

            const correct = mdlGuesses.correct()
            const wrong   = mdlGuesses.wrong()
            if(correct.includes(guess) || wrong.includes(guess)){
            /* the client should be responsible for not sending the same guess */
                return undefined
            }

            if(_serverWord.includes(guess)){
            /* guess is correct, change the visible word for clients */
                console.log("correct guess")
                let newHiddenWord = ""
                console.log(`server word: ${_serverWord}`)
                for(let index = 0; index < _serverWord.length; index++){
                    if(_serverWord[index] === guess){
                        newHiddenWord += guess
                    }
                    else{
                        newHiddenWord += hiddenWord[index]
                    }
                }

                const newCorrect = mdlGuesses.correct() + guess
                console.log(`newCorrect: ${newCorrect} newHiddenWord: ${newHiddenWord}`)
                const newMdlGuesses = new GuessesModel(newCorrect, mdlGuesses.wrong())
                if(!newHiddenWord.includes('_')){
                /* game is won, return with new guesses state and won status */
                    console.log("game is won")
                    return new ServerGameModel(newMdlGuesses, mdlPlayers, newHiddenWord, GAMESTATUS.WON, _serverWord)
                }
                /* game is still playing, return with new guesses */
                console.log("game is still playing")
                return new ServerGameModel(newMdlGuesses, mdlPlayers, newHiddenWord, GAMESTATUS.PLAYING, _serverWord)
            }
            /* if we are here then there was an incorrect guess */
            const newWrong = mdlGuesses.wrong() + guess
            console.log(`newWrong ${newWrong}`)
            const newMdlGuesses = new GuessesModel(mdlGuesses.correct(), newWrong)
            if(newWrong.length === 6){
            /* sorry my guy, you lost */
                console.log("game is lost")
                return new ServerGameModel(newMdlGuesses, mdlPlayers, this.word(), GAMESTATUS.LOST, _serverWord)
            }
            /* game is still playing, return with new guesses */
            console.log(`wrong guess new wrong guess ${newMdlGuesses.wrong()}`)
            return new ServerGameModel(newMdlGuesses, mdlPlayers, this.word(), GAMESTATUS.PLAYING, _serverWord)
        }

        this.serverWord = () => {
            return _serverWord
        }
        const _serverWord = serverWord
    }
}