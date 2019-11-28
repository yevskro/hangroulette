class SessionService {
    getSession = (sessionId) => {
        return {sessionId: 1, wins: 2, losses: 2, guessed: 'ek', word: "___ __e____ __e____ _k___"}
    }
    newSession = () => {
        return {sessionId: 2, wins: 0, losses: 0, guessed: '', word: "___ _______ _______ _____"}
    }
}

const sessionService = new SessionService()

export default sessionService