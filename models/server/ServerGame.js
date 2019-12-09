import GameModel, { GAMESTATUS } from '../Game'

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

            if(mdlGame.gameStatus !== GAMESTATUS.player){
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
                /* correct guess */
                
                /* check if the game is won */
            }
            /* if we are here then there was an incorrect guess */

        }

        super(mdlGuesses, mdlPlayers, word, gameStatus)
        const _hiddenWord = hiddenWord
    }
}