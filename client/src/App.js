import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState , useEffect} from "react";
import axios from "axios";
//import NavbarComponent from "./components/NavbarComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Composers from "./pages/Composers";
import Pieces from "./pages/Pieces";
import Files from "./pages/Files";
import Profile from "./pages/Profile";

/*****************************************/
/*admin staff */ 
import Dashboard from "./pages/Dashboard";
//files CRUD
import CreateFile from "./pages/CreateFile";
import AdminUsers from "./pages/AdminUsers";
import AdminComposers from "./pages/AdminComposers";
import AdminPieces from "./pages/AdminPieces";
import AdminFiles from "./pages/AdminFiles";


function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    name: "",
    role: "",
    status: false,
  });
  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {
      headers: {
      accessToken: localStorage.getItem("accessToken"),
    }
  }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false});
      }else{
        console.log("NAME: " + response.data.name);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          name: response.data.name,
          role: response.data.role,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, name: "", role: "", status: false});
  };

  //SEARCHBAR TO DO
  return (
    <div className="App">
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">FreeMusic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Sheet Music and Recordings" id="basic-nav-dropdown">
              <NavDropdown.Item href="/composers">Composers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/donations">Donations</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {authState.role==="admin" && (  
              <>
              <Nav className="ml-auto">
                <Button variant="outline-light" href="/admin" className="me-3">Dashboard</Button>
              </Nav>
              </>
          )} 

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light" className="me-3" href="#">Search</Button>
          </Form>
          {!authState.status ? (
            <>
              <Nav className="ml-auto">
                <Button variant="outline-light" href="/login" className="me-3">Login/Register</Button>
              </Nav>
            </>
          ) : (
            <>
              <Nav className="ml-auto">
                <Nav.Link href="/profile">
                  Welcome, {authState.name}
                </Nav.Link>
                  {authState.status && <Button onClick={ logout } href="" variant="outline-light"> Logout</Button>}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/composers" element={<Composers />}></Route>
        <Route path="/pieces/:ComposerId" element={<Pieces />}></Route>
        <Route path="/files/:PieceId" element={<Files />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>

        <Route path="/admin" element={<Dashboard />}></Route>

        <Route path="/admin/users" element={<AdminUsers />}></Route>
        <Route path="/admin/composers" element={<AdminComposers />}></Route>
        <Route path="/admin/pieces" element={<AdminPieces />}></Route>
        <Route path="/admin/files" element={<AdminFiles />}></Route>

        <Route path="/admin/files/add" element={<CreateFile />}></Route>

      </Routes>
    </Router>
    <footer class="pt-3 mt-4 text-muted border-top">
      &copy; placeholder footer
    </footer>
    <br></br>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
