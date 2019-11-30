import Error from "../helpers/error"

class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.id = () => {
            return _id
        }

        this.validate = (id) => {
            this.error.clear()
            const regOnlyNumbers = /^[0-9]*$/

            if(id === ""){
                return this
            }
            
            if(!(regOnlyNumbers.test(id))){
                this.error.set("invalid sessionid")
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        this.error  = new Error()

        if(id === undefined){
            return this
        }

        if(this.validate(id).error.msg){
            return this
        }

        const _id = id
    }
}

export default SessionIdModel