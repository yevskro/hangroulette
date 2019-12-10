import { GAMESTATUS } from '../../../models/Game'

class ServicePlayer{
    emptyPlayer = () => {
        return { 
            id: 0, 
            session: {
                id: 0, wins: 0, losses: 0,
                game: {
                    correct: "", wrong: "",
                    word: "loading",
                    status: GAMESTATUS.LOADING,
                    players: 0, turn: 1
                }
            },
            seconds: 12,
            timestamp: 0
        }
    }

    errorPlayer = () => {
        return { 
            id: 0, 
            session: {
                id: 0, wins: 0, losses: 0,
                game: {
                    correct: "", wrong: "",
                    word: "session error",
                    status: GAMESTATUS.LOADING,
                    players: 0, turn: 1 
                }
            },
            seconds: 0,
            timestamp: 0
        }
    }
}

const servicePlayer = new ServicePlayer()

export default servicePlayer