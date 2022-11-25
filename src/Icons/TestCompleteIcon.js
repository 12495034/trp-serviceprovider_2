import React from 'react'
import { FaUserCheck, FaUserClock, FaThumbsUp } from "react-icons/fa";

export default function TestCompleteIcon(props) {
   
    if (props.complete) {

        return <FaThumbsUp color='green' size='30' />
    } else {
        return 
    }

}