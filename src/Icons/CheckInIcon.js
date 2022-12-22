import React from 'react'
import { FaUserCheck, FaUserClock } from "react-icons/fa";

export default function CheckInIcon(props) {
    if (props.checkedIn === true) {
        return <FaUserCheck color='green' size='20' />
    } else if (props.checkedIn === false) {
        return <FaUserClock color='red' size='15' />
    } else {
        return null
    }

}
