import React from 'react'
import { FaThumbsUp } from "react-icons/fa";
import { iconSize } from '../constants/general';

/**
 * Test complete Icon component, which returns a different icon based on input props
 * @param {checkedIn, complete} props 
 * @returns <FaThumbsUp color='grey' size={iconSize} title="Test Incomplete"/> when test is not complete
 * returns <FaThumbsUp color='green' size={iconSize} title="Test Complete"/> when test is complete
 */

export default function TestCompleteIcon(props) {
    if (props.checkedIn === true && props.complete === true) {
        return <FaThumbsUp color='green' size={iconSize} title="Test Complete"/>
    } else if (props.checkedIn === true && props.complete === false) {
        return <FaThumbsUp color='grey' size={iconSize} title="Test Incomplete"/>
    }

}