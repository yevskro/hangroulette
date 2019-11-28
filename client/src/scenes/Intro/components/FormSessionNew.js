import React from 'react'

const FormSessionNew = (props) => 
    <form className="form-session-new" onSubmit={props.onSubmit}>
        <input className="form-button" type="submit" value={props.submitValue}/>
    </form>

export default FormSessionNew