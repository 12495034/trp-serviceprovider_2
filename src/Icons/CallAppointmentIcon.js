import React from 'react'
import { FaRegBell, FaBell } from "react-icons/fa";
import { iconSize } from '../Constants/Constants';

export default function CallAppointmentIcon(props) {
    if (props.checkedIn === true && props.called === true) {
        return <FaBell color='purple' size={iconSize} />
    } else if (props.checkedIn === true) {
        return <FaRegBell color='purple' size={iconSize} />
    } else if(props.checkedIn===false){
        
    }

}