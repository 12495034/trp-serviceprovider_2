import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { iconSize } from '../constants/general';

export default function DeleteAppointmentIcon(props) {
    if (props.userid && props.checkedIn === false) {
        return <MdDeleteOutline color='black' size={iconSize} title="Delete Appointment"/>
    } else {

    }

}