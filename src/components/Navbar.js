import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

const navbar = ({role, logout}) => {

    return (
        <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand as={Link} to="/">Callories calculator</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            {role.role === "admin" && <Nav.Link as={Link} to="/admin">Admin panel</Nav.Link> }
          </Nav>
          <Nav className="ml-auto">
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
}

export default navbar
