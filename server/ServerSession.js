import SessionModel, { ScoreModel } from '../models/Session'
import { GAMESTATUS, PlayersModel, GuessesModel } from '../models/Game'
import ServerGameModel, { ServerGameError, SGERRORS } from '../models/server/ServerGame'

export default class ServerSession{
    static sessionErrorJSON(error){
        const mdlScore          = new ScoreModel(0, 0) 
        const mdlGameGuesses    = new GuessesModel("", "")
        const mdlPlayers        = new PlayersModel(0, 0, 0)
        const mdlGame           = new ServerGameModel(mdlGameGuesses, mdlPlayers, `error: ${error}`, GAMESTATUS.LOADING, `error: ${error}`)    
        const session           = new SessionModel(1, mdlScore, mdlGame, 0)
        return JSON.stringify({timestamp: Date.now(), player: {id: 1, session: session.jsonObj()}})        
    }
    constructor(session){
        /*              public methods                 */
        /***********************************************/
        this.id         = () => _session.id()
        this.players    = () => _players.length
        this.clients    = () => _players

        this.errorPlayer = (client, error) => {
            client.send(ServerSession.sessionErrorJSON(error))
        }

        this.addPlayer = (client) => {
            if(_players.length === 3){
                return false
            }

            _players.push(client)
            const newMdlGame    = _session.mdlGame().addPlayer()
            /* update session */
            _session            = new SessionModel(_session.id(), 
                                        _session.mdlScore(),
                                        newMdlGame,
                                        _session.seconds())
            _broadcastState()
            if(_players.length === 1){
                _startTimerTurn(GAMESTATUS.PLAYING)
            }
            return true
        }

        this.removePlayer = (client) => {
            const playerIndex = _players.findIndex((c) => c === client)
            if(playerIndex !== _PLAYERDOESNTEXIST){
                const turn              = _session.mdlGame().turn()
                const playerPosition    = playerIndex + 1
                let seconds             = _session.seconds()
                let newMdlGame          = _session.mdlGame().removePlayer()

                _players.splice(playerIndex, 1)
                if(turn === playerPosition){
                    /* if we are removing a player whos in the middle of a turn, reset turn */
                    seconds = _TURNSECONDS
                    newMdlGame = newMdlGame.nextTurn()
                }

                /* update session */
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            newMdlGame,
                                            seconds)

                return true
            }
            return false
        }

        this.playerGuess = (client, guess) => {
            if(!_isClientsTurn(client)){
                return new ServerGameError(SGERRORS.INVALIDTURN)
            }

            /* geuss() will return a new servergamemodel or servergame error if data is corrupt */
            const newGameState = _session.mdlGame().guess(guess)

            if(newGameState instanceof ServerGameError){
                return newGameState
            }

            /* at this point the guess is valid. update session score if won/lost, reset turn seconds */
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
                _stopTimerTurn()
                _startTimerRestartGame(gameStatus)
            }

            _session = new SessionModel(_session.id(), mdlScore, newGameState, seconds)
            _broadcastState()
            return this
        }
        /*              private methods                */
        /***********************************************/
        const _isClientsTurn = (client) => {
            const turn = _session.mdlGame().turn()
            const index = _players.findIndex((el) => el === client)
            /* players are saved as 1,2,3 so shift the index by 1 to correlate */
            if(index + 1 === turn){
                return true
            }
            return false
        }

        const _broadcastState = () => {
            /* send all connected clients the session state, which includes game state */
            const session = _session.jsonObj()
            _players.forEach((el, index) => el.send(JSON.stringify({timestamp: Date.now(), player: {id: index + 1, session}})))
        }

        const _startTimerTurn = () => {
            const timerTurn = () => {
                const newSecond = _session.seconds() - 1 || _TURNSECONDS
                const mdlGame   = _session.mdlGame()
                if(newSecond === _TURNSECONDS){
                    /* new turn has started, update state of turn accordingly, with .nextTurn() */
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
                    /* no game state to change, only update the session second state */
                    _session            = new SessionModel(_session.id(), 
                                                            _session.mdlScore(),
                                                            _session.mdlGame(),
                                                            newSecond)
                }
                _broadcastState()
            }

            _timerTurn = setInterval(timerTurn, 1000)
        }

        const _stopTimerTurn = () => {
            clearInterval(_timerTurn)
        }

        const _startTimerRestartGame = (gameStatus) => {
            let seconds = _RESTARTSECONDS
            const mdlGame = _session.mdlGame()
            /* new game feedback to the players */
            let newMdlGame = new ServerGameModel(mdlGame.mdlGuesses(),
                                                    mdlGame.mdlPlayers(),
                                                    "NEW GAME",
                                                    gameStatus,
                                                    mdlGame.serverWord())
            const restartTurn = () => {
                seconds--
                if(seconds === 1){
                    /* end of the timer */
                    _stopTimerRestartGame()
                    /* start new game with a word */
                    newMdlGame = new ServerGameModel(new GuessesModel("", ""),
                                                        mdlGame.mdlPlayers(),
                                                        "____",
                                                        GAMESTATUS.PLAYING,
                                                        mdlGame.serverWord())
                    _startTimerTurn()
                }
                /* update session seconds state */
                _session = new SessionModel(_session.id(), 
                                            _session.mdlScore(),
                                            newMdlGame,
                                            seconds)
                _broadcastState()
            }
            _timerRestartGame = setInterval(restartTurn, 1000)
        }

        const _stopTimerRestartGame = () => {
            clearInterval(_timerRestartGame)
        }
        /***********************************************/
        const _players              = []
        const _TURNSECONDS          = 10
        const _RESTARTSECONDS       = 4
        const _PLAYERDOESNTEXIST    = -1
        let _session                = session
        let _timerTurn              = 0
        let _timerRestartGame       = 0
    }
}