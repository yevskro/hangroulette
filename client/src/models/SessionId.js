class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.setId = (id) => {
            if(!this.validateId(id).errorMsg){
                _id = id
            }

            return this
        }

        this.getId = () => {
            return _id
        }

        this.validateId = id => {
            this.errorMsg = ""
            const regOnlyNumbers = /^[0-9]*$/

            if(!(regOnlyNumbers.test(id))){
                this.errorMsg = "invalid sessionid"
            }
            
            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        let _id = "" 
        
        if(id !== undefined){
            this.setId(id)
        }
    }
}

export default SessionIdModel