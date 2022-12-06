import React from 'react'
import { FaCalendarCheck, FaCalendarTimes, FaCalendarWeek } from "react-icons/fa";

export default function ClinicStatusIcon(props) {
    if (props.checkedIn) {
        return <FaCalendarCheck size={20} color='green' />
    } else {
        return <FaCalendarWeek size={20} color='orange' />
    }

}

