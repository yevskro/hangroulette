class SessionService {
    getSession = (sessionId) => {
        return {sessionId: 1, wins: 2, losses: 2, correct: 'ek', wrong: '', word: "___ __e____ __e____ _k___"}
    }
    newSession = () => {
        return {sessionId: 2, wins: 0, losses: 0, correct: '', wrong: '', word: "___ _______ _______ _____"}
    }
}

const sessionService = new SessionService()

export default sessionService