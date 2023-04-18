import React from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { iconSize } from '../constants/general';

export default function TestCompleteIcon(props) {
    if (props.checkedIn === true && props.complete === true) {
        return <FaThumbsUp color='green' size={iconSize} title="Test Complete"/>
    } else if (props.checkedIn === true && props.complete === false) {
        return <FaThumbsUp color='grey' size={iconSize} title="Test Incomplete"/>
    }

}