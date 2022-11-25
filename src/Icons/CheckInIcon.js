import React from 'react'
import { FaUserCheck, FaUserClock, FaThumbsUp } from "react-icons/fa";

export default function CheckInIcon(props) {

    if (props.checkedIn) {

        return <FaUserCheck color='green' size='30' />
    } else {
        return <FaUserClock color='red' size='30' />
    }

}
