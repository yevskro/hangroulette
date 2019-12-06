import SessionModel from '../models/Session'

export default class PlayerModel{
    constructor(id, mdlSession){
        this.id = () => {
            debugger
            return id
        }
        
        this.mdlSession = () => {
            return mdlSession
        }

        const validateId = (id) => {
            if(typeof(id) !== 'number'){
                throw new TypeError(`id must be a number{${id}}`)
            }

            if(id < 0){
                throw new Error('id must be >= 0{${id}}')
            }
            return id
        }

        const validateSession = (mdlSession) => {
            if(mdlSession instanceof SessionModel){
                return mdlSession
            }
            throw new TypeError(`session must be an instance of sessionmodel{${session}}`)        
        }

        validateId(id)
        validateSession(mdlSession)
    }
}