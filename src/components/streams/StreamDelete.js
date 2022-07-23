import React, { useEffect } from "react";
import Modal from "../Modal";
import history from "../../history";
import { fetchStream, deleteStream } from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const StreamDelete = (props) => {
    useEffect(() => {
        props.fetchStream(props.match.params.id)
    }, [])

    
    const actions = (
        <React.Fragment>
            <button onClick = {() => props.deleteStream(props.match.params.id)}className="ui primary button negative">Delete</button>
            <Link to = '/' className="ui button">Cancel</Link>
        </React.Fragment>
    )
    return(
        <Modal title="Delete Stream" content={renderContent(props)} actions={actions} onDismiss={()=>history.push('/')}/>
    ) 
}


const mapStateToProps = (state, ownProps) => {
    return {stream : state.streams[ownProps.match.params.id]}
}

const renderContent = (props) => {
    if (!props.stream){
        return 'Are you sure you want to delete this stream?'
    }
    return `Are you sure you want to delete stream ${props.stream.title}?`
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete)