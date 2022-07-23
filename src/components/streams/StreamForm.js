import React from "react";
import { Field, reduxForm } from "redux-form";

const StreamForm = (props) => {
    const onSubmit = (formValues) => {
        props.onSubmit(formValues)
    }
    return(
        <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
            <Field name='title' component={renderInput} label='Enter Title'/>
            <Field name='description' component={renderInput} label='Enter Description'/>
            <button className="ui button primary">Submit</button>
        </form>
    )
}
const renderError = ({error, touched}) => {
    if (touched && error){
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        )
    }
}

const renderInput = (formProps) => {
    const className = formProps.meta.error && formProps.meta.touched ? 'error' : ''
    return(
        <div className={`field ${className}`}>
            <label>{formProps.label}</label>
            <input {...formProps.input}/>
            {renderError(formProps.meta)}
        </div>  
    ) 
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title){
        errors.title = 'You must enter a title'
    }
    if (!formValues.description){
        errors.description = 'You must enter a description'
    }
    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm)

