import React from 'react'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import UserCard from '../components/UserCard'
import { Container, Table, Form, Button } from 'react-bootstrap'
import UsersToolBar from '../components/UsersToolBar'
import UsersSearchBar from '../components/UsersSearchBar'
import UserTable from '../components/UserTable'

//TODO: Add footer
export default function UserManagement() {
  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <h1>User Management</h1>
        {/* Insert toolbar */}
        <p>From this screen you can view all users of the app and their profile details. It shall also be possible to suspend a user from the service if necessary.</p>
        <UsersSearchBar />
        <UsersToolBar />
        <hr />
        <UserTable />
      </Container>

      <Footer />
    </div>
  )
}
