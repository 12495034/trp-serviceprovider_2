import React from 'react'
import { FaRegBell, FaRegBellSlash, FaBell } from "react-icons/fa";


export default function CallAppointmentIcon(props) {
    if (props.checkedIn === true && props.called === true) {
        return <FaBell color='purple' size='20' />
    } else if (props.checkedIn === true) {
        return <FaRegBell color='purple' size='20' />
    } else if(props.checkedIn==false){
        return <FaRegBellSlash color='black' size='15' />
    }

}