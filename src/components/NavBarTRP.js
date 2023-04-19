import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from 'react-bootstrap';
import { UserAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { hover } from '@testing-library/user-event/dist/hover';

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
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px' }}
                    >
                        <Link className='navbar-menu' to="/home">Home</Link>
                        <Link className='navbar-menu' to="/clinics">Clinic Management</Link>
                        <Link className='navbar-menu' to="/users">User Management</Link>
                    </Nav>
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                            <Navbar.Text>
                                {/* Signed in as: <a href={`/users/${props.userId}`}>{props.email}</a> */}
                                Signed in as: <Link to={`/users/${user.uid}`}>{user.email}</Link>
                            </Navbar.Text>
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
