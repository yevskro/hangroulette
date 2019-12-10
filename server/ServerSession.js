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
            const gameStatus = newGameState.gameStatus()
            if(newGameState === undefined){
                return undefined
            }
            console.log(`session:${_session.id()} playerGuess() newGameState:`)  
            console.log(newGameState.word())
            console.log(`now printing out server sessions arguements besides id`)
            console.log(`${_session.mdlScore()}, ${_session.seconds()}`)
            const mdlScore          = _session.mdlScore()
            const newSession =  new SessionModel(_session.id(), mdlScore, newGameState, 12)
            _session = newSession
            this.stopTurnTimer()
            this.broadcastState()
            if(gameStatus === GAMESTATUS.PLAYING){
                this.startTurnTimer()
            }
            else{
                this.startGameOverTimer()
            }
            console.log(`newSession ${newSession.mdlGame().word()}`)

            return this
        }

        this.broadcastState = () => {
            const session = _session.jsonObj()
            for(let j = 0; j < _players.length; j++){
                _players[j].send(JSON.stringify({timestamp: Date.now(), player: {id: j + 1, session}}))
            }
        }

        this.startTurnTimerEx = (gameStatus) => {
            const turnTimer = () => {
                const newSecond = _session.seconds() - 1 || 12
                if(newSecond === 1 && gameStatus !== GAMESTATUS.PLAYING){
                    // TODO: create new mdlGame with playing state
                    _session = new SessionModel(_session.id(), 
                                                _session.mdlScore(),
                                                _session.mdlGame(),
                                                newSecond)
                    return
                }
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            _session.mdlGame(),
                                            newSecond)
                this.broadcastState()
            }

            _timer = setInterval(turnTimer, 1000)
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

        this.stopTurnTimer = () => {
            clearInterval(_timer)
        }

        this.gameOverTimer = () => {
            let seconds = 4
            const turnTimer = () => {
                seconds--
                if(seconds === 1){
                    this.stopGameOverTimer()
                    // change mdlGame gamestatus here
                    //const newGameModel = 
                    //_session = new SessionModel()
                    this.startTurnTimer()
                    return
                }
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            _session.mdlGame(),
                                            seconds)
                this.broadcastState()
            }
            _timer = setInterval(turnTimer,1000)
        }

        this.stopGameOverTimer = () {
            clearInterval(_gameOverTimer)
        }
        const _players = []
        let _session = session
        let _timer = 0
        let _gameOverTimer = 0 
    }
}