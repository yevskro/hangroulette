import { useCookies } from 'react-cookie';

class SessionService {
    getSession = (sessionId) => {
        return {sessionID: 1, wins: 2, losses: 2, guessed: 'ek', word: "___ __e____ __e____ _k___"}
    }
    newSession = () => {
        return {sessionID: 2, wins: 0, losses: 0, guessed: '', word: "___ _______ _______ _____"}
    }
    saveSessionIdCookie = () => {

    }
    getSessionIdCookie = () => {

    }
    newAndSaveSessionId = () => {
        return this.saveSessionId(this.newSession())
    }
    getAndSaveSessionId = (sessoinId) => {
        return this.saveSessionId(this.getSession(sessionId))
    }
}

const sessionService = new SessionService()

export default sessionService