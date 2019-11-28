import introErrors from './error';

class ValidateSession{
    static validateSession = s => {
        if(parseInt(s) > 0)
            return {valid: true, errorMsg: ""}
        return {valid: false, errorMsg: introErrors.getError(1)}
    }
}

export default ValidateSession