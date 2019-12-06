export default class ServerPlayer{
    /* relational class, player has session, session has many players */
    constructor(id, client, session){
        this.client = () => {
            return client
        }
        this.session = () => {
            return session
        }
        // todo: validations for client and serversession
    }
}