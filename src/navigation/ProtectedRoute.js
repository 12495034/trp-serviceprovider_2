import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

/**
 * Functional component controls access to protected routes
 */

export default function ProtectedRoute() {

    //user, role, accountstatus and logout function passed through AuthContext Provider
    const { user, role, accountStatus, logOut } = UserAuth();
    const location = useLocation();

    async function handleSignOut() {
        console.log("un-authorised user, signing out....")
        try {
            await logOut()
        } catch (e) {
            console.log(e.message)
        }
    }

    //if user is logged in and has admin privileges then allow them access to the web application
    //otherwise the user is logged out and directed to a page indicating they are unauthorised to access the web app
    if (user!=null && role !== "Service-User" && accountStatus !== "Suspended") {
        return <Outlet />
    } else {
        handleSignOut()
        return <Navigate to='/unauthorised' state={{ from: location }} replace />
    }
}
