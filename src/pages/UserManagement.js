import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Table, Form, Button, Row } from 'react-bootstrap'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import { collection, query, getDocs, where } from "firebase/firestore";
import { firestore } from '../config/Firebase'
import { UserAuth } from '../context/AuthContext';
import { convertFirestoreTimeStamp } from '../Functions/SpecialFunctions/convertFirestoreTimeStamp';
import SpinnerIcon from '../components/SpinnerIcon';

export default function UserManagement() {
  //------------------------------------------------------------------------------------------------
  //        DEFINE STATE
  //------------------------------------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState(false)
  const [pressed, setPressed] = useState(false)
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
    setPressed(true)
    setIsLoading(true)
    const collectionName = "Users"
    //prevent screen re-render
    e.preventDefault();
    var q = "";
    //Wild card characters cannot be used with firestore queries therefore the query has to be built based on the state of the search input parameters
    if (searchBar.FirstName === "" && searchBar.LastName === "") {
      q = query(collection(firestore, `${collectionName}`));
    } else if (searchBar.FirstName === "") {
      q = query(collection(firestore, `${collectionName}`), where("LastName", "==", `${searchBar.LastName}`));
    } else if (searchBar.LastName === "") {
      q = query(collection(firestore, `${collectionName}`), where("FirstName", "==", `${searchBar.FirstName}`));
    } else if (searchBar.FirstName !== "" && searchBar.LastName !== "") {
      q = query(collection(firestore, `${collectionName}`), where("FirstName", "==", `${searchBar.FirstName}`), where("LastName", "==", `${searchBar.LastName}`));
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
      setIsLoading(false)
    } catch (e) {
      setError(e.message)
      setIsLoading(false)
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
        <td>{convertFirestoreTimeStamp(item.createdAt)}</td>
      </tr>
    )
  })

  return (

    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <h1 className='page-title justify-content-md-justified'>User Management</h1>
        {/* Insert toolbar, future developement with radio buttons */}
        <p>From this screen you can view all users of the app and their profile details. Search for a user based on their first or last name</p>
        <p><strong>Note:</strong> To view list of all stored users press the search button with no input parameters</p>
        <Row xs={1} sm={1} md={1}>
          <Form className="d-flex" onSubmit={searchUsers}>
              <Form.Control
                type="search"
                placeholder="First Name"
                className="me-2"
                aria-label="Search"
                name="FirstName"
                onChange={handleSearchBar}
              />
              <Form.Control
                type="search"
                placeholder="Last Name"
                className="me-2"
                aria-label="Search"
                name="LastName"
                onChange={handleSearchBar}
              />
         
            <Button type="submit" variant="outline-success">Search</Button>
          </Form>
        </Row>
        <hr />
        {isLoading ?
          <Row className="justify-content-center p-3"><SpinnerIcon /></Row>
          :
          <Table size='sm' responsive='sm' striped bordered hover>
            {pressed? <thead>
              <tr>
                <th>Pro-Nouns</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Created On</th>
              </tr>
            </thead>:
              null}
            <tbody>
              {userList}
            </tbody>
          </Table>
        }
        {allUsers.length === 0 && pressed === true && isLoading === false ? <p className="text-danger">No users found, please make sure there is a capital letter at the start of the name</p> : null}
        {error ? <h4><code>{error}</code></h4> : null}
      </Container>
      <Footer />
    </div>

  )
}
