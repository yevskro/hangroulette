import Error from "../helpers/error"

class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.get = () => {
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

        let _id = "" 
        this.error = new Error()

        if(id === undefined){
            return this
        }

        if(!this.validate(id).error.msg){
            _id = id
        }
    }
}

export default SessionIdModel