class IntroError{
    constructor(){
        this.errors = [
            "Session does not exist!",
            "Invalid session number!"
        ]
    }

    getError(e){
        return this.errors[e - 1]
    }
}

const introError = new IntroError
export default introError