import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

const GoogleAuth = (props) => {
    const auth = useRef('');
    useEffect(()=> {
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '252040941266-c1m3pne673imj743tvbaq0589ddifrhe.apps.googleusercontent.com',
                scope: 'email',
                plugin_name: 'Quiver'
            }).then(()=>{
                auth.current = window.gapi.auth2.getAuthInstance();
                onAuthChange(auth.current.isSignedIn.get())
                auth.current.isSignedIn.listen(onAuthChange)
            })
        })
    }, [])

    const onAuthChange = isSignedIn => isSignedIn ? props.signIn(auth.current.currentUser.get().getId()) : props.signOut()

    const onSignInClick = () => {
        auth.current.signIn()
    }

    const onSignOutClick = () => {
        auth.current.signOut()
    }

    const renderAuthButton = () => {
        if (props.isSignedIn === null){
            return null;
        } else if (props.isSignedIn){
            return(
                <button className="ui red google button" onClick={onSignOutClick}>
                    <i className="google icon"/>Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui red google button" onClick={onSignInClick}>
                    <i className="google icon"/>Sign In With Google
                </button>
            )
        }
    }
    return <div>{renderAuthButton()}</div>
}

const mapStatetoProps = (state) => {
    return {isSignedIn: state.auth.isSignedIn}
}

export default connect(mapStatetoProps, {signIn, signOut})(GoogleAuth)