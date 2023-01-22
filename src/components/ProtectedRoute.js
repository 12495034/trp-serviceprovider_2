import React, { useEffect, useState, useRef } from 'react'
import { Outlet, Navigate, useLocation, useHistory } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { firestore } from '../Firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function ProtectedRoute() {

    const [userDetails, setUserDetails] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { user } = UserAuth();
    const location = useLocation();

    async function getUserInfo(id) {
        if (id) {
            const docRef = doc(firestore, "Users", `${id}`);
            const docSnap = await getDoc(docRef);
            const data = docSnap.exists() ? docSnap.data() : null
            if (data === null || data === undefined) return null
            setUserDetails({ id, ...data })
            setLoaded(true)
        }
    }

    //TODO: Role is retrieved here but the page is rendered before the data to check it made available
    //error is parked at present until a solution is found. 
    useEffect(() => {
        getUserInfo(user.uid)
    }, [user])

    if (user) {
        return <Outlet />
    } else {
        return <Navigate to='/unauthorised' state={{ from: location }} replace />
    }

}
