import SessionModel from '../models/Session'
import { GAMESTATUS } from '../models/Game'

export default class ServerSession{
    constructor(session){
        this.id = () => _session.id()
        this.players = () => _players.length
        this.clients = () => _players

        this.addPlayer = (client) => {
            if(_players.length === 3){
                return false
            }
            _players.push(client)
            if(_players.length === 1){
                this.startTurnTimer()
            }
            return true
        }

        this.removePlayer = (client) => {
            const playerIndex = _players.findIndex((c) => c === client)
            if(playerIndex !== undefined){
                _players.splice(playerIndex, 1)
                console.log(`removed client from session: ${_session.id()} players: ${this.players()}`)
                return true
            }
            return false
        }

        this.playerGuess = (client, guess) => {
            const newGameState = _session.mdlGame().guess(guess)
            if(newGameState === undefined){
                return undefined
            }
            console.log(`session:${_session.id()} playerGuess() newGameState:`)  
            console.log(newGameState.word())
            console.log(`now printing out server sessions arguements besides id`)
            console.log(`${_session.mdlScore()}, ${_session.seconds()}`)
            const mdlScore          = _session.mdlScore()
            let newSeconds = 12
            const gameStatus = newGameState.gameStatus()
            console.log(gameStatus === GAMESTATUS.WON)
            switch (gameStatus){
                case GAMESTATUS.WON:
                case GAMESTATUS.LOST:
                    newSeconds = 4
                    break;
                default:
                    newSeconds = 12
            }
            console.log("after guess " + gameStatus + "seconds " + newSeconds)
            const newSession =  new SessionModel(_session.id(), mdlScore, newGameState, newSeconds)
            _session = newSession
            console.log(`newSession ${newSession.mdlGame().word()}`)
            return this
        }

        this.broadcastState = () => {
            const session = _session.jsonObj()
            for(let j = 0; j < _players.length; j++){
                _players[j].send(JSON.stringify({timestamp: Date.now(), player: {id: j + 1, session}}))
            }
        }

        this.startTurnTimer = () => {
            const turnTimer = () => {
                const newSecond = _session.seconds() - 1 || 12
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            _session.mdlGame(),
                                            newSecond)
                this.broadcastState()
            }
            _timer = setInterval(turnTimer,1000)
        }

        const _players = []
        let _session = session
        let _timer = 0
    }
}