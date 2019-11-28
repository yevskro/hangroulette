class SessionIdModel{
    constructor(id){
        let _id = "" 
        this.errorMsg = ""

        this.setId = (id) => {
            const validate = SessionIdModel.validateId(id)
            if(!validate.valid)
                return {errorMsg: validate.errorMsg}
            _id = id
            return this
        }
        this.getId = () => {
            return _id
        }

        const error = this.setId(id)
        if(error.errorMsg){
            this.errorMsg = error.errorMsg
        }

        _id = id
    }

    static validateId = id => {
        const hasOnlyNumbers = /^[0-9]*$/
        if(hasOnlyNumbers.test(id)){
            return {valid: true, errorMsg: ""}
        }
        return {valid: false, errorMsg: "invalid sessionid"}
    }
}

export default SessionIdModel