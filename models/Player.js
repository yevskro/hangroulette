export default class Player{
    constructor(id, session){
        this.id = () => {
            return id
        }
        
        this.session = () => {
            return session
        }

        const validateId = (id) => {
            if(typeof(id) !== 'number'){
                throw new Error(`id must be a number{${id}}`)
            }
            return id
        }

        const validateSession = (session) => {
            if(session instanceof SessionModel){
                return session
            }
            throw new Error(`session must be an instance of sessionmodel{${session}}`)        
        }
        validateId(id)
        validateSession(session)
    }
}