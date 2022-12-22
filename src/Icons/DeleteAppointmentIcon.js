import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

export default function DeleteAppointmentIcon(props) {
    if (props.userid && props.checkedIn===false) {
        return <MdDeleteOutline color='black' size='20' />
    } else {
        
    }

}