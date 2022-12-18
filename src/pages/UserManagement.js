import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { Container, Table, Form, Button, Row, Col } from 'react-bootstrap'
import UsersToolBar from '../components/UsersToolBar'
import UsersSearchBar from '../components/UsersSearchBar'
import UserTable from '../components/UserTable'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'

import { collection, getDocs, getDoc, addDoc, query, onSnapshot, getCountFromServer, where } from "firebase/firestore";
import { firestore } from '../Firebase'

//TODO: Add footer
export default function UserManagement() {

  //------------------------------------------------------------------------------------------------
  //        DEFINE STATE
  //------------------------------------------------------------------------------------------------
  const [allUsers, setAllUsers] = useState([])
  const [filterUserStatus, setFilterUserStatus] = useState("Active")
  const [filterUserRole, setFilterUserRole] = useState("Service-User")
  const [searchBar, setSearchBar] = useState({
    FirstName: "",
    LastName: ""
  })

  //console.log(filterUserStatus)
  //console.log(filterUserRole)
  console.log(searchBar)
  console.log(allUsers)

  const navigate = useNavigate()

  useEffect(() => {
    //fetchUsers()
  }, [])

  //------------------------------------------------------------------------------------------------
  //        FUNCTIONS
  //------------------------------------------------------------------------------------------------
  function fetchUsers() {
    const q = query(collection(firestore, 'Users'), where("status", "==", `${filterUserStatus}`), where("Role", "==", `${filterUserRole}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArray = []
      querySnapshot.forEach((doc) => {
        const id = { id: doc.id }
        const data = doc.data()
        const combine = Object.assign({}, id, data)
        usersArray.push(combine)
      })
      setAllUsers(usersArray)
    })
    return () => unsubscribe();
    //
  }

  function handleClick(userid) {
    navigate(`/Users/${userid}`);
  }

  function handleUserStatusChange(e) {
    setFilterUserStatus(e.target.value)
  }

  function handleUserRoleChange(e) {
    setFilterUserRole(e.target.value)
  }

  function searchUsers(e) {
    //prevent screen re-render
    e.preventDefault();
    var q = "";
    //Wild card characters cannot be used with firestore queries therefore the query has to be built based on the state of the search input parameters
    if (searchBar.FirstName == "" && searchBar.LastName == "") {
      q = query(collection(firestore, 'Users'));
    } else if (searchBar.FirstName == "") {
      q = query(collection(firestore, 'Users'), where("LastName", "==", `${searchBar.LastName}`));
    } else if (searchBar.LastName == "") {
      q = query(collection(firestore, 'Users'), where("FirstName", "==", `${searchBar.FirstName}`));
    } else if (searchBar.FirstName != "" && searchBar.LastName != "") {
      q = query(collection(firestore, 'Users'), where("FirstName", "==", `${searchBar.FirstName}`), where("LastName", "==", `${searchBar.LastName}`));
    } else {

    }

    console.log(q)
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArray = []
      querySnapshot.forEach((doc) => {
        const id = { id: doc.id }
        const data = doc.data()
        const combine = Object.assign({}, id, data)
        usersArray.push(combine)
      })
      setAllUsers(usersArray)
    })
    return () => unsubscribe();
    //
  }

  function handleSearchBar(e) {
    const { name, value } = e.target
    setSearchBar(prev => {
      return {
        ...prev, [name]: value
      }
    }
    )
  }


  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------

  //create JSX elements based on stored state data
  const userList = allUsers.map((item) => {
    //for data security the name of the person is not shown but the id of the person is perhaps
    return (
      <tr key={item.id} onClick={() => handleClick(item.id)}>
        <td>{item.id}</td>
        <td>{item.ProNouns}</td>
        <td>{item.FirstName}</td>
        <td>{item.LastName}</td>
        <td>{item.status}</td>
        <td>{item.Role}</td>
      </tr>
    )
  })

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <h1>User Management</h1>
        {/* Insert toolbar */}
        <p>From this screen you can view all users of the app and their profile details. Search for a user based on their first or last name or filter based on the users status and role</p>
        <p><strong>Note:</strong> To view list of all stored users press the search button with no input parameters</p>
        <Row>
          <Form className="d-flex" onSubmit={searchUsers}>
            <Form.Control
              type="search"
              placeholder="Enter First Name"
              className="me-2"
              aria-label="Search"
              name="FirstName"
              onChange={handleSearchBar}
            />
            <Form.Control
              type="search"
              placeholder="Enter Last Name"
              className="me-2"
              aria-label="Search"
              name="LastName"
              onChange={handleSearchBar}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Row>
        <Row>
          {/* //Functionality is present that allows filtering of status and role if required. But it seems more useful to be able to search by a specific name */}
          {/* <Form>
            <Row>
              <Form.Group className="mt-3 mb-3" as={Col} controlId="formGridState">
                <Form.Label>User Status</Form.Label>
                <Form.Control
                  as="select"
                  name="location"
                  onChange={handleUserStatusChange}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mt-3 mb-3" as={Col} controlId="formGridState">
                <Form.Label>User Role</Form.Label>
                <Form.Control
                  as="select"
                  name="location"
                  onChange={handleUserRoleChange}
                >
                  <option value="Service-User">Service User</option>
                  <option value="Admin">Admin</option>
                  
                </Form.Control>
              </Form.Group>
            </Row>
          </Form> */}
        </Row>
        <hr />
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
            {userList}
          </tbody>
        </Table>
      </Container>
      <Footer />
    </div>
  )
}
