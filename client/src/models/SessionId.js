import Error from "../services/error"

class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.setId = (id) => {
            if(!this.validateId(id).error.msg){
                _id = id
            }

            return this
        }

        this.getId = () => {
            return _id
        }

        this.validateId = id => {
            this.error.clear()
            const regOnlyNumbers = /^[0-9]*$/

            if(!(regOnlyNumbers.test(id))){
                this.error.set("invalid sessionid")
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        let _id = "" 
        this.error = Error()

        if(id !== undefined){
            this.setId(id)
        }
    }
}

export default SessionIdModel