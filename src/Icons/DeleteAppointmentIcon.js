import React from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { iconSize } from '../constants/general';

/**
 * Delete appointment Icon component, which returns a different icon based on input props
 * @param {userid, checkedIn} props 
 * @returns <MdDeleteOutline color='black' size={iconSize} title="Delete Appointment"/> if the user is not checked in
 */

export default function DeleteAppointmentIcon(props) {
    if (props.userid && props.checkedIn === false) {
        return <MdDeleteOutline color='black' size={iconSize} title="Delete Appointment"/>
    } 
}