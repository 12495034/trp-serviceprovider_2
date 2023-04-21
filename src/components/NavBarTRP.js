import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { UserAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'


export default function NavBarTRP(props) {
    const { user } = UserAuth()

    return (
        <Navbar className='NavBar' expand="lg">
        <Container fluid>
            <Navbar.Brand>
                <img
                    alt=""
                    src={require('../images/logo.png')}
                    width="100"
                    height="100"
                    className="d-inline-block align-top"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto"
                >
                    <Link className='navbar-menu' to="/home">Home</Link>
                    <Link className='navbar-menu' to="/clinics">Clinic Management</Link>
                    <Link className='navbar-menu' to="/users">User Management</Link>
                </Nav>
                <Nav>
                        <Navbar.Text className='ms-auto'>
                            {/* Signed in as: <a href={`/users/${props.userId}`}>{props.email}</a> */}
                            Signed in as: <Link to={`/users/${user.uid}`}>{user.email}</Link>
                        </Navbar.Text>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}
