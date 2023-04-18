import React from 'react'
import { FaRegBell, FaBell } from "react-icons/fa";
import { iconSize } from '../constants/general';

export default function CallAppointmentIcon(props) {
    if (props.checkedIn === true && props.called === true) {
        return <FaBell color='purple' size={iconSize} title="Appointment Called"/>
    } else if (props.checkedIn === true) {
        return <FaRegBell color='purple' size={iconSize} title="Appointment yet to be Called"/>
    } else if(props.checkedIn===false){
        
    }

}