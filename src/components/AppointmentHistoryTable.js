import React from 'react'

export default function AppointmentHistoryTable({children}) {
    return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </Table>
  )
}
