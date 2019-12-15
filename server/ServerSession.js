import SessionModel from '../models/Session'
import { GAMESTATUS, PlayersModel, GuessesModel } from '../models/Game'
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
            const newMdlGame    = _session.mdlGame().addPlayer()
            _session            = new SessionModel(_session.id(), 
                                        _session.mdlScore(),
                                        newMdlGame,
                                        _session.seconds())
            this.broadcastState()
            if(_players.length === 1){
                this.startTimerTurn(GAMESTATUS.PLAYING)
            }
            return true
        }

        this.removePlayer = (client) => {
            const playerIndex = _players.findIndex((c) => c === client)
            if(playerIndex !== -1){
                _players.splice(playerIndex, 1)
                const turn = _session.mdlGame().turn()
                const playerPosition = playerIndex + 1
                let seconds = _session.seconds()
                if(turn === playerPosition){
                    seconds = _TURNSECONDS
                }
                let newMdlGame = _session.mdlGame().removePlayer()
                if(turn > newMdlGame.players()){
                    newMdlGame = newMdlGame.nextTurn()
                }

                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            newMdlGame,
                                            seconds)

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
            if(!this.isClientsTurn(client)){
                return new ServerGameError(SGERRORS.INVALIDTURN)
            }

            const newGameState = _session.mdlGame().guess(guess)

            if(newGameState instanceof ServerGameError){
                return newGameState
            }

            const gameStatus    = newGameState.gameStatus()
            let mdlScore        = _session.mdlScore()
            let seconds         = _TURNSECONDS

            if(gameStatus !== GAMESTATUS.PLAYING){
                seconds = _RESTARTSECONDS
                if(gameStatus === GAMESTATUS.WON){
                    mdlScore = mdlScore.won()
                }
                else{
                    mdlScore = mdlScore.lost()
                }
                this.stopTimerTurn()
                this.startTimerRestartGame(gameStatus)
            }

            _session = new SessionModel(_session.id(), mdlScore, newGameState, seconds)
            this.broadcastState()
            return this
        }

        this.broadcastState = () => {
            const session = _session.jsonObj()
            for(let j = 0; j < _players.length; j++){
                _players[j].send(JSON.stringify({timestamp: Date.now(), player: {id: j + 1, session}}))
            }
        }

        this.startTimerTurn = () => {
            const timerTurn = () => {
                const newSecond = _session.seconds() - 1 || TURNSECONDS
                const mdlGame   = _session.mdlGame()
                if(newSecond === _TURNSECONDS){
                    const newMdlPlyrs   = new PlayersModel(mdlGame.mdlPlayers().players(),
                                                            mdlGame.mdlPlayers().nextTurn())

                    const newMdlGame    = new ServerGameModel(mdlGame.mdlGuesses(),
                                                                newMdlPlyrs,mdlGame.word(),
                                                                GAMESTATUS.PLAYING,
                                                                mdlGame.serverWord())

                    _session            = new SessionModel(_session.id(), 
                                                            _session.mdlScore(),
                                                            newMdlGame,
                                                            newSecond)
                }
                else{
                    _session            = new SessionModel(_session.id(), 
                                                            _session.mdlScore(),
                                                            _session.mdlGame(),
                                                            newSecond)
                }
                this.broadcastState()
            }

            _timerTurn = setInterval(timerTurn, 1000)
        }

        this.stopTimerTurn = () => {
            clearInterval(_timerTurn)
        }

        this.startTimerRestartGame = (gameStatus) => {
            let seconds = _RESTARTSECONDS
            const mdlGame = _session.mdlGame()
            let newMdlGame = new ServerGameModel(mdlGame.mdlGuesses(),
                                                    mdlGame.mdlPlayers(),
                                                    "NEW GAME",
                                                    gameStatus,
                                                    mdlGame.serverWord())
            const restartTurn = () => {
                seconds--
                if(seconds === 1){
                    this.stopTimerRestartGame()
                    newMdlGame = new ServerGameModel(new GuessesModel("", ""),
                                                        mdlGame.mdlPlayers(),
                                                        "____",
                                                        GAMESTATUS.PLAYING,
                                                        mdlGame.serverWord())
                    this.startTimerTurn()
                }
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            newMdlGame,
                                            seconds)
                this.broadcastState()
            }
            _timerRestartGame = setInterval(restartTurn, 1000)
        }

        this.stopTimerRestartGame = () => {
            clearInterval(_timerRestartGame)
        }

        const _players          = []
        let _session            = session
        let _timerTurn          = 0
        let _timerRestartGame   = 0
        const _TURNSECONDS      = 10
        const _RESTARTSECONDS   = 4
}