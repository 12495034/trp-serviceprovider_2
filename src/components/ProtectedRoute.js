import React from 'react'
import { Navigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {

    const { user } = UserAuth();

    //TODO: Need to retrieve user details from firestore and determine if user has sufficient privileges
    if (user) {
        return children
    } else {
        return <Navigate to='/' />
    }

}
