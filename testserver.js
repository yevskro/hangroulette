 // todo: extend gamemodel
import GameModel from './models/Game'

class GameServerModel extends GameModel{

}

class ServerSession{
    constructor(session){
        this.players = () => plyrClients.length
        this.addPlayer = (client) => {
            if(this.players() === 3){
                return undefined
            }
            plyrClients.push(client)
        }

        this.removePlayer = (client) => {
            const plyrIndex = plyrClients.find((el, index) => {
                if(el === client){
                    return index
                }
            })
            if(plyrIndex === undefined){
                throw new Error("could not find client in clients(removeplayer)")
            }
            plyrClients = plyrClients.splice(plyrIndex, 1)

        }

        this.playerGuess = (guess) => {
            // validate guess through the gameservermodel
            // return undefined to disconnect the client if the 
            // guess is invalid
            // if the guess is valid, then check if
            // the guess against the word and
            // broadcast the results
        }

        const plyrClients = []
        let session = session
    }
}

class ServerConnection{
    constructor(client, serverSession){
        this.client = () => {
            return client
        }
        this.serverSession = () => {
            return serverSession
        }
        // todo: validations for client and serversession
    }
}

class ServerGame{
    constructor(MAXSESSIONS){
        this.newClient = (client) => {
            let aSession = this.availableSessionFromIndex(0)
            if(aSession === undefined){/* all game sessions are full with the maxiumum players */
                /* we are going to have to create a new session for our client to join */
                const id = totalSessionsCreated + 1
                aSession = this.createEmptySession(id)
                sessions.push(aSession)
            } 
            aSession.addPlayer(client)
            connections.push(new ServerConnection(client,aSession)) 
        }

        this.availableSessionFromIndex = (index) => {
            /* loops through sessions and find the best playable match, which
               is the closest to being full */
            let aSession = undefined
            for(let i = indexStart; i < sessions.length; i++){
                const session = sessions[i]
                const players = session.players()
                if(players !== 3){ /* if game is not full */
                    if(players === 2){
                        /* found a game that is almost full save and exit loop */
                        aSession = session
                        break;
                    }
                    /* if found with one player save it because currently
                        its the best match but don't exit, there
                        might be a better match on the loom */
                    if(aSession === undefined){
                        aSession = session
                    }
                }
            }
            return aSession
        }

        this.moveClientToTheNextSession = (client) => {
            const sessionIndex = this.sessionIndexFromClientId(client)
            const newSession = this.availableSessionFromIndex(sessionIndex)
            if(newSession !== undefined){ 
                /* found a playable session */
                const session = sessions[sessionIndex]
                session.removePlayer(client)
                newSession.addPlayer(client)
                return session
            } /* if there was no playable session available we will not be creating
                a new session.. our boy is stuck in the game ¯\_(ツ)_/¯*/
            return undefined
        }

        this.sessionIndexFromSessionId = (id) => {
            session.find((el, index) => {
                if(el.id == id){
                    return index
                }
            })
            throw new Error("could not find sessionindex(sessionIndexFromSessionId)")
        }

        this.createEmptySession = () => {

        }

        this.removeSession = (session) => {
            sessions = sessions.splice(this.sessionIndexFromSessionId(session.id),1)
        }

        this.removeConnection = (connection) => {
            const connectIndex = connects.find((srvCon, index) => {
                if(srvCon.client() === connection){
                    return index
                }
            })
            if(connectIndex === undefined){
                throw new Error("could not find connectection(removeconnection)")
            }
            const session = connects[connectIndex].session()
            session.removePlayer(connection)
            connects = connects.splice(connectIndex, 1)
            if(session.players() === 0){
                this.removeSession(session)
            }
        }

        let totalSessionsCreated = 0
        const sessions = []
        const connects = []
        const MAXSESSIONS = MAXSESSIONS
    }
}