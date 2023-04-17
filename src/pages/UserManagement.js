import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Table, Form, Button, Row, Stack } from 'react-bootstrap'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from '../config/Firebase'
import { UserAuth } from '../context/AuthContext';

export default function UserManagement() {

  const { user } = UserAuth();
  //------------------------------------------------------------------------------------------------
  //        DEFINE STATE
  //------------------------------------------------------------------------------------------------
  const [allUsers, setAllUsers] = useState([])
  const [error, setError] = useState('')
  const [searchBar, setSearchBar] = useState({
    FirstName: "",
    LastName: ""
  })
  const navigate = useNavigate()

  //------------------------------------------------------------------------------------------------
  //        FUNCTIONS
  //------------------------------------------------------------------------------------------------

  async function searchUsers(e) {
    console.log("button pressed")
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

    //perform firestore query based on logic above
    const querySnapshot = await getDocs(q)
    let usersArray = []
    try {
      querySnapshot.forEach((doc) => {
        const id = { id: doc.id }
        const data = doc.data()
        const combine = Object.assign({}, id, data)
        usersArray.push(combine)
      })
      setAllUsers(usersArray)
    } catch (e) {
      setError(e.message)
    }
  }

  function handleSearchBar(e) {
    const { name, value } = e.target
    setSearchBar(prev => {
      return {
        ...prev, [name]: value
      }
    })
  }

  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------

  //create JSX elements based on stored state data
  const userList = allUsers.map((item) => {
    //for data security the name of the person is not shown but the id of the person is perhaps
    return (
      <tr key={item.id} onClick={() => navigate(`/Users/${item.id}`)}>
        <td>{item.ProNouns}</td>
        <td>{item.FirstName}</td>
        <td>{item.LastName}</td>
        <td>{item.email}</td>
      </tr>
    )
  })

  return (
    <div className='page-body'>
      <NavBarTRP userId={user.uid} email={user.email} />
      <Container className='page-content'>
        <h1>User Management</h1>
        {/* Insert toolbar */}
        <p>From this screen you can view all users of the app and their profile details. Search for a user based on their first or last name or filter based on the users status and role</p>
        <p><strong>Note:</strong> To view list of all stored users press the search button with no input parameters</p>
        <Row>
          <Form className="d-flex" onSubmit={searchUsers}>
            {/* <Stack direction='horizontal' gap={1} className="col-md-5 mx-auto">
              <div className=""> */}
                <Form.Control
                  type="search"
                  placeholder="Enter First Name"
                  className="me-2"
                  aria-label="Search"
                  name="FirstName"
                  onChange={handleSearchBar}
                />
              {/* </div>
              <div className="me-auto"> */}
                <Form.Control
                  type="search"
                  placeholder="Enter Last Name"
                  className="me-2"
                  aria-label="Search"
                  name="LastName"
                  onChange={handleSearchBar}
                />
              {/* </div> */}
              {/* <div className="vr" />
              <div className="ms-auto"> */}
                <Button type="submit" variant="outline-success">Search</Button>
              {/* </div>
            </Stack> */}
          </Form>
        </Row>
        <hr />
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Pro-Nouns</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userList}
          </tbody>
        </Table>
        {error ? <h4><code>{error}</code></h4> : null}
      </Container>
      <Footer />
    </div>
  )
}
