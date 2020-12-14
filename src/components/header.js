import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/ownup-logo.svg';

function Header() {
	return (
        <Navbar collapseOnSelect expand="lg" className="color-nav" variant="light">
            <Navbar.Brand>          
                <img src={logo} width="200" className="d-inline-block align-top" alt="Own Up"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto" activeKey="/">
                    <p><Nav.Link href="https://www.ownup.com/about/">About</Nav.Link></p>
                    <p><Nav.Link href="https://www.ownup.com/how-it-works/">How It Works</Nav.Link></p>
                    <p><Nav.Link href="https://resources.ownup.com/">Resources</Nav.Link></p>
                    <p><Nav.Link href="https://www.ownup.com/reviews/">Reviews</Nav.Link></p>
                    <p><Nav.Link href="https://www.ownup.com/faq/">FAQs</Nav.Link></p>
                    <p><Nav.Link href="https://discover.ownup.com/get-started">Get Started</Nav.Link></p>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
);
}

export default Header;
