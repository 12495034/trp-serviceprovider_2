import React from 'react'
import { Table } from 'react-bootstrap'
import { FaUserCheck, FaUserClock, FaThumbsUp, FaRegBell, FaRegBellSlash } from "react-icons/fa";
import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';

//TODO: Checked-in and Call icons need to be pressable to trigger specific functions
//TODO: Work out how to ensure user id is available to pass to the detail screen
export default function AppointmentTable() {
    function handleUserDetail(){
        console.log("Show user detail screen")
    }

    function handleCheckIn(){
        console.log("User Checked In")
    }

    function handleCallNextAppointment(){
        console.log("Calling next appointment")
    }

    return (
        <div className='text-center'>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Time</th>
                        <th>Name</th>
                        <th>Tester</th>
                        <th>Status</th>
                        <th>Checked-in</th>
                        <th>Call</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>18:00</td>
                        <td><div onClick={handleUserDetail}>Gavin Davis</div></td>
                        <td>Leo Lardie</td>
                        <td><TestCompleteIcon complete={true}/></td>
                        <td><div onClick={handleCheckIn}><CheckInIcon checkedIn={true}/></div></td>
                        <td><div onClick={handleCallNextAppointment}><CallAppointmentIcon checkedIn={true}/></div></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>18:30</td>
                        <td>Steven Davis</td>
                        <td>Leo Lardie</td>
                        <td><TestCompleteIcon complete={true}/></td>
                        <td><CheckInIcon checkedIn={true}/></td>
                        <td><CallAppointmentIcon checkedIn={true}/></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>19:00</td>
                        <td>Lester Davis</td>
                        <td>Leo Lardie</td>
                        <td></td>
                        <td><CheckInIcon checkedIn={true}/></td>
                        <td><CallAppointmentIcon checkedIn={true}/></td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>19:30</td>
                        <td>George Davis</td>
                        <td>Leo Lardie</td>
                        <td></td>
                        <td><CheckInIcon checkedIn={false}/></td>
                        <td><CallAppointmentIcon checkedIn={false}/></td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>20:00</td>
                        <td>John Davis</td>
                        <td>Leo Lardie</td>
                        <td></td>
                        <td><CheckInIcon checkedIn={false}/></td>
                        <td><CallAppointmentIcon checkedIn={false}/></td>
                    </tr>


                </tbody>
            </Table>
        </div >
    )
}
