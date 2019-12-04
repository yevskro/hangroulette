class SessionIdModel{
    constructor(id){
        /* ENCAPSULATED CLASS FUNCTION SETUP */
        /*************************************/
        this.id = () => {
            return id
        }

        this.validate = (id) => {
            const regOnlyNumbers = /^[0-9]*$/

            if(id !== "" && !(regOnlyNumbers.test(id)) || id === undefined){
                throw new Error(`invalid sessionid{${id}}`)
            }

            return this
        }

        /* MAIN CONSTRUCTOR CODE */
        /*************************/

        this.validate(id)
        const _id = id
    }
}

export default SessionIdModel