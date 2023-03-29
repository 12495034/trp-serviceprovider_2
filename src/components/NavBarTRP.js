import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Stack } from 'react-bootstrap';
import { MdPerson } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function NavBarTRP(props) {
    const navigate = useNavigate()

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
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/clinics">Clinic Management</Nav.Link>
                        <Nav.Link href="/users">User Management</Nav.Link>
                    </Nav>
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                            <Navbar.Text>
                                Signed in as: <a href={`/users/${props.userId}`}>{props.email}</a>
                            </Navbar.Text>
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
