import React from 'react'
import { FaCalendarCheck, FaCalendarWeek } from "react-icons/fa";
import { iconSize } from '../Constants/Constants';

//Not currently used
export default function ClinicStatusIcon(props) {
    if (props.checkedIn) {
        return <FaCalendarCheck size={iconSize} color='green' />
    } else {
        return <FaCalendarWeek size={iconSize} color='orange' />
    }

}

