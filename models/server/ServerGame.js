import GameModel from '../Game'

export default class ServerGameModel extends GameModel{
    constructor(mdlGuesses, mdlPlayers, word, gameStatus, hiddenWord){
        this.validateGuess = (guess) => {

        }

        this.guess = (guess) => {

        }

        super(mdlGuesses, mdlPlayers, word, gameStatus)
        const _hiddenWord = hiddenWord
    }
}