import React from 'react'
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { iconSize } from '../constants/general';

export default function CheckInIcon(props) {

    if (props.checkedIn === true) {
        return <FaUserCheck color='green' size={iconSize} title="checkedIn" />
    } else if (props.checkedIn === false) {
        return <FaUserClock color='red' size={iconSize} title="notCheckedIn" />
    } else {
        return null
    }

}
