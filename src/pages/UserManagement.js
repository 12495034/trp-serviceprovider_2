import React from 'react'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import UserCard from '../components/UserCard'

//TODO: Add footer
export default function UserManagement() {
  return (
    <div className="container">
      <NavBarTRP />
      <div className="user-body">
        <h1>User Management</h1>
        {/* Insert toolbar */}
        <p>From this screen you can view all users of the app and their profile details. It shall also be possible to suspend a user from the service if necessary.</p>
        <div className="user-list">
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
          <UserCard pronouns="He/Him" firstName="Gavin" lastName="Davis" role="Service-User" accountStatus="Active" />
        </div>
      </div>
      <Footer />
    </div>
  )
}
