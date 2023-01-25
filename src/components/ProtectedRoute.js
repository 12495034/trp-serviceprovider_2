import React, { useEffect, useState, useRef } from 'react'
import { Outlet, Navigate, useLocation, useHistory } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { firestore } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { render } from 'react-dom';
import { getAuth, getIdToken, getIdTokenResult } from 'firebase/auth';

export default function ProtectedRoute() {

    const [loaded, setLoaded] = useState(false);
    const { user, userRole } = UserAuth();
    const location = useLocation();

    console.log(user)
    const role = userRole == "Admin"
    console.log(role)

    async function getUserInfo(id) {
        if (id) {
            const docRef = doc(firestore, "Users", `${id}`);
            const docSnap = await getDoc(docRef)
            return docSnap.data().Role
        }
    }

    //TODO: Role is retrieved here but the page is rendered before the data to check it made available
    //error is parked at present until a solution is found. 

    //-------------------------------------------------------------
    // render
    //-------------------------------------------------------------

    // getUserInfo(user.uid).then(userRole => {
    //     setUserRole(userRole)
    // })

    //if user is logged in and has admin privileges then allow them access to the web application
    //still an issue here 

    if (user) {
        return <Outlet />
    } else {
        return <Navigate to='/unauthorised' state={{ from: location }} replace />
    }

}
