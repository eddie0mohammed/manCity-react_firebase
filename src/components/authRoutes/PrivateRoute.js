import React from 'react'
import {Route, Redirect} from 'react-router-dom';

const PrivateRoutes = (props) => {
    const {user, component: Comp, ...rest} = props;
    return (
        <Route {...rest} component={(props) => (
            user ?
            <Comp {...props} user={user}/> :
            <Redirect to="/signin" />
        )}/>
    )
}

export default PrivateRoutes
