import http from 'http'
import websocket from 'websocket'
import serviceSession from '../client/src/services/session'
import servicePlayer from '../client/src/services/player'
import SessionModel from '../models/Session'

export default class ServerGame{
    constructor(MAXCLIENTS, port){
        this.newClient = (client) => {
            _created.clients = _created.clients + 1
            /* _sessionForClient() will create a new session if none avail */
            const aSession = _sessionForClient()
            //aSession.addPlayer(client) 
            /* addPlayer not implemented yet stubbed out */
            return aSession
        }

        this.moveClientToTheNextSession = (client) => {
            //const sessionIndex = _sessionIndexFromClientId(client)
            //const newSession = _availableSessionFromIndex(sessionIndex)
            //if(newSession !== undefined){ 
                /* found a playable session */
            //    const session = sessions[sessionIndex]
            //    session.removePlayer(client)
            //    newSession.addPlayer(client)
            //    return session
            //} /* if there was no playable session available we will not be creating
            //    a new session.. our boy is stuck in the game ¯\_(ツ)_/¯*/
            //return undefined       
        }

        this.action = (client, action) => {
            //const sessionIndex = _sessionIndexFromClient
            const player = JSON.parse(servicePlayer.errorPlayer())
            client.send(JSON.stringify(player))
        }

        const _sessionForClient = () => {
            const session = _bestAvailableSessionFromIndex(0)
            if(session === undefined){
                return _createNewSession()
            }
            return session
        }

        const _sessionIndex = (session) => {
            return sessions.find((s, index) => {
                if(s === session){
                    return index
                }
            })
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
            if(_sessions[index].players() === 2){
                return index
            }
            if(best !== undefined){
                best = index
            }
            return _bestAvailableSession(index + 1, best)
        }

        const _createNewSession = () => {
            _created.sessions++
            return serviceSession.createSessionFromId(_created.sessions)
        }

        const _removeSession = (session) => {
            // finds the index where session is located
            // in sessions and removes it from the array
            const index = _sessionIndex(session)
            if(index !== undefined){
                sessions.slice(index,1)
            }
            throw new Error("_removeSession: session to remove is not found")
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
                    const objAction = JSON.parse(msg.utf8Data)
                    this.action(client, objAction)
                })
                client.on('close', () => {
                    this.removeClient(client)
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

        /* _created, _sessions, _players will be mutated within */
        const   _created                = {clients: 0, sessions: 0}
        const   _sessions               = []
        /********************************************************/
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