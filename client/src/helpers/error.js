class Error{
    constructor(){
        this.msg = ""
    }

    set(msg){
        this.msg = msg
        console.log(msg)
    }

    clear(){
        this.msg = ""
    }

    add(msg){
        this.msg += msg
        console.log(msg)
    }
}

export default Error