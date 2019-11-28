class SessionIdModel{
    constructor(id){
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
            const hasOnlyNumbers = /^[0-9]*$/
            if(hasOnlyNumbers.test(id)){
                this.errorMsg = ""
                return this
            }
            this.errorMsg = "invalid sessionid"
        }

        let _id = "" 
        this.errorMsg = ""

        if(id !== undefined){
            this.setId(id)
        }
    }
}

export default SessionIdModel