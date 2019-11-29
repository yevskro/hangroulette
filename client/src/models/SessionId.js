class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.setId = (id) => {
            this.validateId(id)
            if(!this.errorMsg)
                _id = id
            return this
        }

        this.getId = () => {
            return _id
        }

        this.validateId = id => {
            const regOnlyNumbers = /^[0-9]*$/
            this.errorMsg = ""
            if(!(regOnlyNumbers.test(id))){
                this.errorMsg = "invalid sessionid"
            }
            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        let _id = "" 
        this.errorMsg = ""

        if(id !== undefined){
            this.setId(id)
        }
    }
}

export default SessionIdModel