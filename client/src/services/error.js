class Error{
    constructor(){
        this.error = ""
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