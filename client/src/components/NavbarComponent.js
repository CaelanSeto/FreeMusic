import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NavbarComponent(authState) {
  console.log(authState);
  window.name = authState;
  return (  
  
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">FreeMusic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Sheet Music and Recordings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/composers">Composers</NavDropdown.Item>
              <NavDropdown.Item href="/pieces">
                Pieces
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/donations">
                Donations
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>       
          {!authState.status ? (
            <>
              <Nav className="ml-auto">
                <Nav.Link href="/login">Login/Register</Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ml-auto">
                {authState.email}
                {authState.status && <button onClick={() => {"logout"} }> Logout</button>}
              </Nav>
            </>
              )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;