import { GAMESTATUS } from '../../../models/Game'
class SessionService {
    getSession = (sessionId) => {
        return JSON.stringify({sessionId: 1, wins: 2, losses: 2, correct: 'ek', wrong: '', word: "___ __e____ __e____ _k___", status: GAMESTATUS.PLAYING, player: 1, players: 2, turn: 1,seconds: 0})
    }
    getNewGame = () => {
        return JSON.stringify({sessionId: 2, wins: 0, losses: 0, correct: '', wrong: '', word: "___ _______ _______ _____", status: GAMESTATUS.PLAYING,player: 1, players: 1, turn: 1,seconds: 0})
    }
    postGuess = () => {
        return JSON.stringify({sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "w__ __e____ __e____ _k___", status: GAMESTATUS.PLAYING,player: 1, players: 1, turn: 1,seconds: 0})
    }

    postWinGuess = () => {
        return JSON.stringify({sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: GAMESTATUS.WON,player: 1, players: 1, turn: 1,seconds: 0})
    }
    postGuessTimeout = () => {
        return JSON.stringify({sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "w__ __e____ __e____ _k___", status: GAMESTATUS.PLAYING, player: 1, players: 2, turn: 2, seconds: 12})   
    }
    postAddPlayer = () => {
        return JSON.stringify({sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: GAMESTATUS.WON,player: 1, players: 2, turn: 2,seconds: 0})    
    }

    emptySession = () => {
        return JSON.stringify({ 
            session: {id: 1,wins: 0, losses: 0,
                game: {correct: "", wrong: "",
                    word: "loading",
                    status: GAMESTATUS.LOADING, 
                    players: [1], turn: 1, seconds: 0 
                }
            }
        })
    }

    errorSession = () => {
        return JSON.stringify({ 
            session: {id: 0, wins: 0, losses: 0,
                game: {correct: "", wrong: "",
                    word: "session error",
                    status: GAMESTATUS.LOADING,
                    players: [1], turn: 1, seconds: 0 
                }
            }
        })
    }
}

const sessionService = new SessionService()

export default sessionService