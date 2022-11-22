import React from 'react'

export default function UserCard(props) {

    function ageCalc(dob) {
        return "age"
    }

    return (
        <div className="user-card">
            <img src={require("../images/user_test.jpg")} alt="missing" />
            <div className="user-card-details">
                <ul>
                    <li>Pro-nouns: {props.pronouns}</li>
                    <li>First Name: {props.firstName}</li>
                    <li>Last Name: {props.lastName}</li>
                    {/* <li>Dob: {props.dob}</li>
                    <li>Age: {ageCalc(props.dob)}</li> */}
                    <li>Role: {props.role}</li>
                    <li>Account Status: {props.accountStatus}</li>
                    {/* <li>Created on: {props.createdOn}</li> */}
                </ul>
            </div>
            <div className="user-card-buttons">
                <button className="user-details-edit-button">Edit Details</button>
                <button className="user-suspend-button">Suspend User</button>
            </div>

        </div>
    )
}
