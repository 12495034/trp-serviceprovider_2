import React from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
    const { user, isAdmin, logOut } = UserAuth();
    const navigate = useNavigate()
    const location = useLocation();

    console.log(user)
    console.log(isAdmin)

    async function handleSignOut() {
        console.log("un-authorised user, signing out....")
        try {
            await logOut()
        } catch (e) {
            console.log(e.message)
        }
    }

    //if user is logged in and has admin privileges then allow them access to the web application
    if (user !== null && isAdmin !== false) {
        return <Outlet />
    } else {
        handleSignOut()
        return <Navigate to='/unauthorised' state={{ from: location }} replace />
    }
}
