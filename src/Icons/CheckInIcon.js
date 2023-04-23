import React from 'react'
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { iconSize } from '../constants/general';

export default function CheckInIcon(props) {

    if (props.checkedIn === true) {
        //font awesome green user icon returned if appointment checked in state is true
        return <FaUserCheck color='green' size={iconSize} title="checkedIn" />
    } else if (props.checkedIn === false) {
        //font awesome red user icon returned if appointment checked in state is false
        return <FaUserClock color='red' size={iconSize} title="notCheckedIn" />
    } else {
        return null
    }
}
