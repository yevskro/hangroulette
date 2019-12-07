export default class ServerSession{
    constructor(session){
        this.id = () => _session.id()
        this.players = () => _players.length
        
        this.addPlayer = (client) => {
            if(_players.length === 3){
                return false
            }
            _players.push(client)
            console.log(`added client to session: ${_session.id()} players: ${this.players()}`)
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

        this.playerGuess = (guess) => {
        
        }

        const _players = []
        let _session = session
    }
}