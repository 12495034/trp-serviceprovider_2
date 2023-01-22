import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Container, Table, Form, Button, Row } from 'react-bootstrap'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'

import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from '../Firebase'

//TODO: Add footer
export default function UserManagement() {

  //------------------------------------------------------------------------------------------------
  //        DEFINE STATE
  //------------------------------------------------------------------------------------------------
  const [allUsers, setAllUsers] = useState([])
  const [searchBar, setSearchBar] = useState({
    FirstName: "",
    LastName: ""
  })

  const navigate = useNavigate()

  //------------------------------------------------------------------------------------------------
  //        FUNCTIONS
  //------------------------------------------------------------------------------------------------

  function handleClick(userid) {
    navigate(`/Users/${userid}`);
  }

  async function searchUsers(e) {
    //prevent screen re-render
    e.preventDefault();
    var q = "";
    //Wild card characters cannot be used with firestore queries therefore the query has to be built based on the state of the search input parameters
    if (searchBar.FirstName === "" && searchBar.LastName === "") {
      q = query(collection(firestore, 'Users'));
    } else if (searchBar.FirstName === "") {
      q = query(collection(firestore, 'Users'), where("LastName", "==", `${searchBar.LastName}`));
    } else if (searchBar.LastName === "") {
      q = query(collection(firestore, 'Users'), where("FirstName", "==", `${searchBar.FirstName}`));
    } else if (searchBar.FirstName !== "" && searchBar.LastName !== "") {
      q = query(collection(firestore, 'Users'), where("FirstName", "==", `${searchBar.FirstName}`), where("LastName", "==", `${searchBar.LastName}`));
    } else {

    }

    const querySnapshot = await getDocs(q)
    let usersArray = []
    querySnapshot.forEach((doc) => {
      const id = { id: doc.id }
      const data = doc.data()
      const combine = Object.assign({}, id, data)
      usersArray.push(combine)
    })
    setAllUsers(usersArray)
  }

  function handleSearchBar(e) {
    const { name, value } = e.target
    setSearchBar(prev => {
      return {
        ...prev, [name]: value
      }})}


  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------

  //create JSX elements based on stored state data
  const userList = allUsers.map((item) => {
    //for data security the name of the person is not shown but the id of the person is perhaps
    return (
      <tr key={item.id} onClick={() => handleClick(item.id)}>
        <td>{item.ProNouns}</td>
        <td>{item.FirstName}</td>
        <td>{item.LastName}</td>
        <td>{item.status}</td>
        <td>{item.Role}</td>
        <td>{item.Email}</td>
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
        <hr />
        <Table responsive striped bordered hover>
          <thead>
            <tr>

              <th>Pro-Nouns</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Email</th>
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
