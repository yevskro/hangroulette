import Error from "../services/error"

class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.set = (id) => {
            if(!this.validate(id).error.msg){
                _id = id
            }

            return this
        }

        this.get = () => {
            return _id
        }

        this.validate = (id) => {
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
            this.set(id)
        }
    }
}

export default SessionIdModel