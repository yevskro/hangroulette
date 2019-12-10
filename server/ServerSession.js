import SessionModel from '../models/Session'

export default class ServerSession{
    constructor(session){
        this.id = () => _session.id()
        this.players = () => _players.length
        
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
            console.log(`session:${_session.id()} playerGuess() newGameState:`)  
            console.log(newGameState)
            console.log(`now printing out server sessions arguements besides id`)
            console.log(`${_session.mdlScore()}, ${_session.seconds()}`)
            return new ServerSession(   _session.id(),
                                        _session.mdlScore(),
                                        newGameState,
                                        _session.seconds())
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
            const id = setInterval(turnTimer,1000)
        }
        const _players = []
        let _session = session
    }
}