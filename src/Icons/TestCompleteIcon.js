import React from 'react'
import { FaUserCheck, FaUserClock, FaThumbsUp } from "react-icons/fa";

export default function TestCompleteIcon(props) {
    if (props.checkedIn == true && props.complete == true) {
        return <FaThumbsUp color='green' size='20' />
    } else if (props.checkedIn == true && props.complete == false) {
        return <FaThumbsUp color='grey' size='20' />
    }

}