import React from 'react'
import { FaUserCheck, FaUserClock } from "react-icons/fa";
import { iconSize } from '../Constants/Constants';

export default function CheckInIcon(props) {
    if (props.checkedIn === true) {
        return <FaUserCheck color='green' size={iconSize} />
    } else if (props.checkedIn === false) {
        return <FaUserClock color='red' size={iconSize} />
    } else {
        return null
    }

}
