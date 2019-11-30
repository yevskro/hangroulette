import { GAMESTATUS } from '../models/Game'

class SessionService {
    getSession = (sessionId) => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ek', wrong: '', word: "___ __e____ __e____ _k___", status: GAMESTATUS.PLAYING, player: 1, players: 1, turn: 1}
    }
    getNewGame = () => {
        return {sessionId: 2, wins: 0, losses: 0, correct: '', wrong: '', word: "___ _______ _______ _____", status: GAMESTATUS.PLAYING,player: 1, players: 1, turn: 1}
    }
    postGuess = () => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "w__ __e____ __e____ _k___", status: GAMESTATUS.PLAYING,player: 1, players: 1, turn: 1}
    }

    postWinGuess = () => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: GAMESTATUS.WON,player: 1, players: 1, turn: 1}
    }

    emptySession = () => {
        return { sessionId: "",
        wins: 0, losses: 0,
        correct: "", wrong: "",
        word: "loading",
        status: GAMESTATUS.LOADING, 
        player: 1, players: 1, turn: 1 } 
    }

    errorSession = () => {
        return { sessionId: "",
        wins: 0, losses: 0,
        correct: "", wrong: "",
        word: "session error",
        status: GAMESTATUS.LOADING,
        player: 1, players: 1, turn: 1 } 
    }
}

const sessionService = new SessionService()

export default sessionService