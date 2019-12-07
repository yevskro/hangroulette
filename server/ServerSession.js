export default class ServerSession{
    constructor(session){
        this.id = () => _session.id()
        this.players = () => _players.length
        
        this.addPlayer = (client) => {
            if(_players.length === 3){
                return false
            }
            _players.push(client)
            return true
        }

        this.removePlayer = (client) => {
            const playerIndex = _players.findIndex((c) => c === client)
            if(playerIndex !== undefined){
                _players.splice(playerIndex, 1)
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