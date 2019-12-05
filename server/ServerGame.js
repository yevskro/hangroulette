
export default class ServerGame{
    constructor(MAXSESSIONS){
        this.newClient = (client) => {
            // doesnt return anything
        }

        this.moveClientToTheNextSession = (client) => {
            // returns next session that the client is connected to
        }

        this.action = (connection, client) => {

        }

        const _availableSessionFromIndex = (index) => {
            // returns available session
        }

        const _sessionIndexFromSessionId = (id) => {
            // returns session index from the sessions by the session id
        }

        const _createEmptySession = () => {
            // returns empty session
        }

        const _removeSession = (session) => {
            // returns the sessions object for chaining
        }

        const _removeConnection = (connection) => {
            // returns null
        }

        let     _totalSessionsCreated   = 0
        const   _sessions               = []
        const   _connects               = []
        const   _MAXSESSIONS            = MAXSESSIONS
    }
}