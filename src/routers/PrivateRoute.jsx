import React from 'react';
import UseAuth from '../hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }) => {

    const {user, loading} = UseAuth()

    if(loading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(!user) {
        <Navigate to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;