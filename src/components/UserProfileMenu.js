import React from 'react'
import { NavDropdown, Nav, Navbar, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function UserProfileMenu() {
    const navigate = useNavigate()
    
    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Actions" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Edit Details</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Reset Password</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
