class SessionIdModel{
    constructor(id){
        let _id = "" 
        this.errorMsg = ""

        this.setId = (id) => {
            this.validateId(id)
            if(!this.errorMsg)
                _id = id
            return this
        }

        this.getId = () => {
            return _id
        }

        this.setId(id)
    }

    validateId = id => {
        const hasOnlyNumbers = /^[0-9]*$/
        if(hasOnlyNumbers.test(id)){
            this.errorMsg = ""
            return
        }
        this.errorMsg = "invalid sessionid"
    }
}

export default SessionIdModel