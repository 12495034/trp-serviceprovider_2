import React from 'react'
import { Table } from 'react-bootstrap'
import { FaUserCheck, FaUserClock, FaThumbsUp } from "react-icons/fa";

export default function UserTable() {
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>Pro-Nouns</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Status</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>he/him</td>
        <td>Mark</td>
        <td>Otto</td>
        <td>Active</td>
        <td>Service User</td>
      </tr>
      <tr>
        <td>2</td>
        <td>he/him</td>
        <td>Gavin</td>
        <td>Davis</td>
        <td>Active</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>3</td>
        <td>he/him</td>
        <td>Leo</td>
        <td>Lardie</td>
        <td>Active</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>4</td>
        <td>she/her</td>
        <td>Jayne</td>
        <td>Peterson</td>
        <td>Active</td>
        <td>Admin</td>
      </tr>
    </tbody>
  </Table>
  )
}
