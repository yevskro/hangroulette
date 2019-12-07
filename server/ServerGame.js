import http from 'http'
import websocket from 'websocket'
import serviceSession from '../client/src/services/session'
import servicePlayer from '../client/src/services/player'
import SessionModel from '../models/Session'
import ServerSession from './ServerSession'

export default class ServerGame{
    constructor(MAXCLIENTS, port){
        this.newClient = (client) => {
            _created.clients = _created.clients + 1
            /* _sessionForClient() will create a new session if none avail */
            const aSession = _sessionForClient()
            aSession.addPlayer(client) 
            return aSession
        }

        this.moveClientToNextSession = (client, currentSession) => {
            console.log("moveClient...")
            const sessionIndex = _sessionIndex(currentSession)
            const newSession = _sessions[_bestAvailableSessionFromIndex(sessionIndex)]
            if(newSession !== undefined){ 
                /* found a playable session */
                const session = _sessions[sessionIndex]
                session.removePlayer(client)
                if(session.players() === 0){
                    _removeSession(session)
                }
                newSession.addPlayer(client)
                console.log(newSession.id())
            } 
            /* if no playable session available we will 
                not create a new session.. our boy is stuck 
                in the game ¯\_(ツ)_/¯ */      
        }

        this.action = (client, action, session) => {
            //const sessionIndex = _sessionIndexFromClient
            /*const player = JSON.parse(servicePlayer.errorPlayer())
            client.send(JSON.stringify(player))
            console.log(_sessions.length + " " + session.id())*/
            if(action.next){
                this.moveClientToNextSession(client, session)
            }
        }

        const _sessionForClient = () => {
            const session = _sessions[_bestAvailableSessionFromIndex(0)]
            if(session === undefined){
                const newSession = _createNewSession()
                _sessions.push(newSession)
                return newSession
            }
            return session
        }

        const _sessionIndex = (session) => {
            return _sessions.findIndex((s) => session === s)
        }

        const _bestAvailableSessionFromIndex = (index, best) => {
            /*  
                Recurse through sessions and find the best playable match
                closest to being full. We want to fill the first sessions 
                created, not the later. [overfill the bucket and
                spill over into the next bucket under idea]
            */
            if(index === _sessions.length){
                return best
            }
            const players = _sessions[index].players()

            if(players === 2){
                return index
            }
            if(best === undefined && players !== 3){
                best = index
            }
            return _bestAvailableSessionFromIndex(index + 1, best)
        }

        const _createNewSession = () => {
            _created.sessions++
            return new ServerSession(serviceSession.createSessionFromId(_created.sessions))
        }

        const _removeSession = (session) => {
            const index = _sessionIndex(session)
            if(index === undefined){
                throw new Error("_removeSession: session to remove is not found")
       
            }     
            _sessions.splice(index,1)
        }

        const _bindWebSocket = (server) => {
            const WebSocketServer = websocket.server
            const wsServer = new WebSocketServer({
                httpServer: server
            })

            wsServer.on('request', (request) => {
                const client = request.accept(null,  request.origin)
                if(_created.clients === this.MAXCLIENTS){
                    // TODO: call a function that sends 
                    // a message this server is busy
                    // and closes the connection
                    return
                }

                const srvSession = this.newClient(client)
                client.on('message', (msg) => {
                    const { action } = JSON.parse(msg.utf8Data)
                    this.action(client, action, srvSession)
                })
                client.on('close', () => {
                    srvSession.removePlayer(client)
                    if(srvSession.players() === 0){
                        _removeSession(srvSession)
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
        /***********************************************/
        const   _MAXCLIENTS             = MAXCLIENTS
        const   _port                   = port
        const   _server                 = _createServer()
        const   _wsServer               = _bindWebSocket(_server)
        _server.listen(_port);
    }
}  

/*

            let aSession = undefined
            for(let i = indexStart; i < sessions.length; i++){
                const session = sessions[i]
                const players = session.players()
                if(players !== 3){
                    if(players === 2){ 
                        aSession = session
                        break;
                    }
                    if(aSession === undefined){
                        aSession = session
                    }
                }
            }
            return aSession 
            */

/* 
            let p = [6,7,8]
            let k = p.find((el, index) => {
                if(el == 7){
                    return index
                }
            })
            console.log(k)
*/