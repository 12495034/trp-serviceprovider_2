import React from 'react'
import { Button } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function UnAuthorisedScreen() {

    const { logOut } = UserAuth();
    const navigate = useNavigate()

    async function handleSignOut() {
        console.log("Sign out")
        try {
            await logOut()
            navigate('/')
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div className="m-5">
            <h1>Un-Authorised Access</h1>
            <div>
                <p>You Are not authorised to access this application </p>
                <p>Only rainbow project staff are granted access to this application</p>
                <p>If you believe you should have access then please contact your system administrator </p>
            </div>
            <Button variant='primary' className='user-card-button' onClick={handleSignOut}>Sign-Out</Button>
        </div>
    )
}
