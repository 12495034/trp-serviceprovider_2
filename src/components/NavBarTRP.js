import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MdPerson} from "react-icons/md";

//TODO: User icon style needs adjusted to make it look better. It is currently overlayed over menu item, should be its own line item
export default function NavBarTRP() {
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
                        style={{ maxHeight: '100px' }}
                    >
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/clinics">Clinic Management</Nav.Link>
                        <Nav.Link href="/users">User Management</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/userProfile"><MdPerson size={50} color='purple'/></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
