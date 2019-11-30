import { GAMESTATUS } from '../models/Game'

class SessionService {
    getSession = (sessionId) => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ek', wrong: '', word: "___ __e____ __e____ _k___", status: GAMESTATUS.PLAYING}
    }
    getNewGame = () => {
        return {sessionId: 2, wins: 0, losses: 0, correct: '', wrong: '', word: "___ _______ _______ _____", status: GAMESTATUS.PLAYING}
    }
    postGuess = () => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "w__ __e____ __e____ _k___", status: GAMESTATUS.PLAYING}
    }

    postWinGuess = () => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ekw', wrong: '', word: "wee weeeee wweeee okokok", status: GAMESTATUS.WON}
    }

    emptySession = () => {
        return { sessionId: "",
        wins: 0, losses: 0,
        correct: "", wrong: "",
        word: "loading",
        status: GAMESTATUS.LOADING } 
    }

    errorSession = () => {
        return { sessionId: "",
        wins: 0, losses: 0,
        correct: "", wrong: "",
        word: "session error",
        status: GAMESTATUS.LOADING } 
    }
}

const sessionService = new SessionService()

export default sessionService