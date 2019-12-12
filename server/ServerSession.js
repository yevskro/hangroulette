import SessionModel from '../models/Session'
import { GAMESTATUS, PlayersModel } from '../models/Game'
import ServerGameModel, { ServerGameError, SGERRORS } from '../models/server/ServerGame'

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
            const newMdlGame = _session.mdlGame().addPlayer()
            _session = new SessionModel(_session.id(), 
                                        _session.mdlScore(),
                                        newMdlGame,
                                        _session.seconds())
            if(_players.length === 1){
                this.startTurnTimer(GAMESTATUS.PLAYING)
            }
            return true
        }

        this.removePlayer = (client) => {
            const playerIndex = _players.findIndex((c) => c === client)
            if(playerIndex !== undefined){
                _players.splice(playerIndex, 1)
                //TODO: if a player with the current turn leaves, reset turn
                const turn = _session.mdlGame().turn()
                const playerPosition = playerIndex + 1
                let seconds = _session.seconds()
                if(turn === playerPosition){
                    seconds = 12
                }
                let newMdlGame = _session.mdlGame().removePlayer()
                if(turn > newMdlGame.players()){
                    newMdlGame = newMdlGame.nextTurn()
                }

                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            newMdlGame,
                                            seconds)
                console.log(`removed client from session: ${_session.id()} players: ${this.players()}`)
                return true
            }
            return false
        }

        this.isClientsTurn = (client) => {
            const turn = _session.mdlGame().turn()
            for(let i = 0; i < _players.length; i++){
                if(_players[i] === client){
                    if(i + 1 === turn){
                        return true
                    }
                    return false
                }
            }
        }

        this.playerGuess = (client, guess) => {
            console.log("checking if its the clients turn")
            if(!this.isClientsTurn(client)){
                console.log("not players turn")
                return new ServerGameError(SGERRORS.INVALIDTURN)
            }
            console.log("clients turn is valid")

            const newGameState = _session.mdlGame().guess(guess)
            if(newGameState instanceof ServerGameError){
                return newGameState
            }

            const gameStatus = newGameState.gameStatus()
            console.log(`session:${_session.id()} playerGuess() newGameState:`)  
            console.log(newGameState.word())
            console.log(`now printing out server sessions arguements besides id`)
            console.log(`${_session.mdlScore()}, ${_session.seconds()}`)
            const mdlScore          = _session.mdlScore()
            this.stopTurnTimer()
            let seconds = 12
            if(gameStatus !== GAMESTATUS.PLAYING){
                seconds = 3
            }
            _session = new SessionModel(_session.id(), mdlScore, newGameState, seconds)
            this.broadcastState()
            this.startTurnTimer(gameStatus)
            return this
        }

        this.broadcastState = () => {
            const session = _session.jsonObj()
            for(let j = 0; j < _players.length; j++){
                _players[j].send(JSON.stringify({timestamp: Date.now(), player: {id: j + 1, session}}))
            }
        }

        this.startTurnTimer = (gameStatus) => {
            const turnTimer = () => {
                const newSecond = _session.seconds() - 1 || 12
                if(newSecond === 1 && gameStatus !== GAMESTATUS.PLAYING){
                    // TODO: create new mdlGame with playing state
                    console.log(gameStatus)
                    const mdlGame = _session.mdlGame()
                    const newMdlGame = new ServerGameModel(mdlGame.mdlGuesses(),mdlGame.mdlPlayers(),mdlGame.word(),GAMESTATUS.PLAYING, mdlGame.serverWord())
                    _session = new SessionModel(_session.id(), 
                                                _session.mdlScore(),
                                                newMdlGame,
                                                newSecond)
                    return
                }
                const mdlGame = _session.mdlGame()
                if(newSecond === 12){
                    // nextTurn()
                    const newMdlPlyrs = new PlayersModel(mdlGame.mdlPlayers().players(),
                                                         mdlGame.mdlPlayers().nextTurn())

                    const newMdlGame = new ServerGameModel(mdlGame.mdlGuesses(),newMdlPlyrs,mdlGame.word(),mdlGame.gameStatus(),mdlGame.serverWord())
                    _session = new SessionModel(_session.id(), 
                                                _session.mdlScore(),
                                                newMdlGame,
                                                newSecond)
                }
                else{
                    _session = new SessionModel(_session.id(), 
                                                _session.mdlScore(),
                                                _session.mdlGame(),
                                                newSecond)
                }
                this.broadcastState()
            }

            _timer = setInterval(turnTimer, 1000)
        }

        this.stopTurnTimer = () => {
            clearInterval(_timer)
        }

        const _players = []
        let _session = session
        let _timer = 0
    }
}