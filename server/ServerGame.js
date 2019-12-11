import http from 'http'
import websocket from 'websocket'
import serviceSession from '../client/src/services/session'
import servicePlayer from '../client/src/services/player'
import SessionModel from '../models/Session'
import ServerSession from './ServerSession'
import { ServerGameError, SGERRORS } from '../models/server/ServerGame'

export default class ServerGame{
    constructor(MAXCLIENTS, port, MAXCONNECTIONSPERUSER, UNIQUEPLAY){
        this.newClient = (client) => {
            _created.clients++
            /* _sessionForClient() will create a new session if none avail */
            const aSession = _sessionForClient(client)
            aSession.addPlayer(client) 
            return aSession
        }

        this.moveClientToNextSession = (client, currentSession) => {
            const searchIndex = _sessionIndex(currentSession)
            const bSessionIndex = _bestAvailableSessionFromIndex(client, searchIndex + 1)

            if(bSessionIndex === undefined || _sessions[bSessionIndex] === currentSession){
                return currentSession
            }

            currentSession.removePlayer(client)
            _sessions[bSessionIndex].addPlayer(client)

            if(currentSession.players() === 0){
                _removeSession(currentSession)
            }

            return _sessions[bSessionIndex] 
        }

        this.action = (client, action, session) => {
            if(action.next){
                return this.moveClientToNextSession(client, session)
            }
            if(action.guess){
                const guess = action.guess
                console.log(`before action`)
                const newSession = session.playerGuess(client, guess)
                console.log(`after action newSession is: `)
                console.log(newSession)
                return newSession
            }
            /* action does not exist, malicious data probable */
            return new ServerGameError(SGERRORS.INVALIDACTION) 
        }

        const _sessionForClient = (client) => {
            console.log("sessonForClient called")
            const sessionIndex = _bestAvailableSessionFromIndex(client, 0)
            if(sessionIndex === undefined){
                const newSession = _createNewSession()
                _sessions.push(newSession)
                return newSession
            }
            return _sessions[sessionIndex]
        }

        const _sessionIndex = (session) => {
            return _sessions.findIndex((s) => session === s)
        }

        const _bestAvailableSessionFromIndex = (client, index) => {
            /*  
                Recurse through sessions and find the best playable match
                closest to being full. We want to fill the first sessions 
                created, not the later. [overfill the bucket and
                spill over into the next bucket under idea]
            */
            if(_sessions.length === 0){
                return undefined
            }
            /*
                CyclicalSearch is intended to search from the
                index of sessions to the index before it(if there
                is one) making it "cyclical"
            */
            const cyclicalSearch = (index, count, best) => {
                console.log(`cyclicalSearch: ${index} ${count} ${best}`)
                if(count === _sessions.length){
                    return best
                }

                if(index === _sessions.length){
                    return cyclicalSearch(0, count, best)
                }

                const players = _sessions[index].players()
  
                if(UNIQUEPLAY){
                    const clients = _sessions[index].clients()
                    for(let i = 0; i < players; i++){
                        if(clients[i].remoteAddress === client.remoteAddress){
                            return cyclicalSearch(index + 1, count + 1, best)    
                        }
                    }
                }

                if(players === 2){
                    return index
                }

                if(best === undefined && players !== 3){
                    best = index
                }

                return cyclicalSearch(index + 1, count + 1, best)
            }

            return cyclicalSearch(index, 0)
        }

        const _createNewSession = () => {
            _created.sessions++
            console.log(`created session ${_created.sessions}`)
            return new ServerSession(serviceSession.createServerSessionFromId(_created.sessions))
        }

        const _removeSession = (session) => {
            const index = _sessionIndex(session)
            console.log(`removing session with index ${index}`)
            if(index === undefined || index === -1){
                throw new Error("_removeSession: session to remove is not found")
            }
            _sessions.splice(index,1)
            console.log(`removedsession ${session.id()} length: ${_sessions.length}`)
        }

        const _bindWebSocket = (server) => {
            const WebSocketServer = websocket.server
            const wsServer = new WebSocketServer({
                httpServer: server
            })

            wsServer.on('request', (request) => {
                const client = request.accept(null,  request.origin)
                if(_created.clients === _MAXCLIENTS){
                    // TODO: call a function that sends 
                    // a message this server is busy
                    // and closes the connection
                    return
                }

                let srvSession = this.newClient(client)
                if(_users[client.remoteAddress] === undefined){
                    _users[client.remoteAddress] = 0
                }
                if(_users[client.remoteAddress] === MAXCONNECTIONSPERUSER){
                    client.close()
                    return
                }
                _users[client.remoteAddress]++
                client.on('message', (msg) => {
                    const { action } = JSON.parse(msg.utf8Data)
                    /*  
                        srvSession is mutated in action() when
                        action is next game
                    */
                    console.log(`onmessage ${action}`)
                    const newSrvSession = this.action(client, action, srvSession)
                    if(newSrvSession instanceof ServerGameError){
                        console.log(newSrvSession.error)
                        client.close()
                    }
                    else{
                        srvSession = newSrvSession
                    }
                })

                client.on('close', () => {
                    srvSession.removePlayer(client)
                    if(srvSession.players() === 0){
                        _removeSession(srvSession)
                    }
                    _users[client.remoteAddress]--
                    if(_users[client.remoteAddress] === 0){
                        delete _users[client.remoteAddress]
                    }
                })
            })

            return wsServer
        }

        const _createServer = () => {
            return http.createServer(function(request, response) {
                response.writeHead(404);
                response.end();
            });
        }

        /* _created, _sessions, will be mutated within */
        const   _created                = {clients: 0, sessions: 0}
        const   _sessions               = []
        const   _users                  = {}
        /***********************************************/
        const   _MAXCLIENTS             = MAXCLIENTS
        const   _port                   = port
        const   _server                 = _createServer()
        const   _wsServer               = _bindWebSocket(_server)
        _server.listen(_port);
    }
}  