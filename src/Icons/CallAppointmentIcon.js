import React from 'react'
import { FaUserCheck, FaUserClock, FaThumbsUp,FaRegBell, FaRegBellSlash } from "react-icons/fa";


export default function CallAppointmentIcon(props) {
   
    if (props.checkedIn) {

        return <FaRegBell color='purple' size='30' />
    } else {
        return <FaRegBellSlash color='black' size='20' />
    }

}