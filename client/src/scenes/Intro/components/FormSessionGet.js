import React from 'react'

const FormSessionGet = (props) => 
    <form className="form-session-get" onSubmit={props.onSubmit}>
        <input className="session-input" value={props.sessionId} placeholder="Session #" onChange={props.handleChangeSession}></input>
        <br/>
        <input className="form-button" type="submit" value={props.submitValue}/>
    </form>

export default FormSessionGet 