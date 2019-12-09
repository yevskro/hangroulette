import GameModel, { GAMESTATUS, GuessesModel } from '../Game'

export default class ServerGameModel extends GameModel{
    constructor(mdlGuesses, mdlPlayers, word, gameStatus, hiddenWord){
        this.guess = (guess) => {
            /* undefined is to be understood as a malicious data attempt */
            try{
                mdlGuesses.validateGuess(guess)
            }
            catch(e){
                return undefined 
            }

            if(mdlGame.gameStatus !== GAMESTATUS.PLAYING){
            /* client should know not to send a guess if the game is over */
                return undefined
            }

            const correct = mdlGuesses.correct()
            const wrong   = mdlGuesses.wrong()
            if(correct.includes(guess) || wrong.includes(guess)){
            /* the client should be responsible for not sending the same guess */
                return undefined
            }

            if(hiddenWord.includes(guess)){
            /* guess is correct, change the visible word for clients */
                let newWord = ""
                for(let index = 0; index < hiddenWord.length; index++){
                    if(hiddenWord[index] === guess){
                        newWord += guess
                        break
                    }
                    newWord += word[index]
                }

                const newCorrect = mdlGuesses.correct + guess
                const newMdlGuesses = new GuessesModel(newCorrect, mdlGuesses.wrong())
                if(newWord.includes('_')){
                /* game is won, return with new guesses state and won status */
                    return new ServerGameModel(newMdlGuesses, mdlPlayers, newWord, GAMESTATUS.WON, hiddenWord)
                }
                /* game is still playing, return with new guesses */
                return new ServerGameModel(newMdlGuesses, mdlPlayers, newWord, GAMESTATUS.PLAYING, hiddenWord)
            }
            /* if we are here then there was an incorrect guess */
            const newWrong = mdlGuesses.wrong + guess
            const newMdlGuesses = new GuessesModel(mdlGuesses.correct, newWrong)
            if(newWrong.length === 6){
            /* sorry my guy, you lost */
                return new ServerGameModel(newMdlGuesses, mdlPlayers, newWord, GAMESTATUS.LOST, hiddenWord)
            }
            /* game is still playing, return with new guesses */
            return new ServerGameModel(newMdlGuesses, mdlPlayers, newWord, GAMESTATUS.PLAYING, hiddenWord)
        }

        super(mdlGuesses, mdlPlayers, word, gameStatus)
        const _hiddenWord = hiddenWord
    }
}