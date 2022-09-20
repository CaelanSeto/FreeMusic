import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthContext";
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
import CreateFile from "./admin/CreateFile";

import Layout from "./components/Layout";
import Unauthorised from "./components/Unauthorised";
import RequireAuth from "./components/RequireAuth";

import Upload from "./admin/Upload";
import Dashboard from "./admin/Dashboard";

const ROLES = {
    'User': "",
    'Admin': ""
  }

function App() {
  
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    name: "",
    status: false,
  });
  useEffect(() => {
    axios.get("http://localhost:3001/users/auth", {
      headers: {
      accessToken: localStorage.getItem("accessToken"),
    }
  }).then((response) => {
      if (response.data.error) {
        console.log("error");
        setAuthState({ ...authState, status: false});
      }else{
        console.log("NAME: " + response.data.name);
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          name: response.data.name,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, name: "", status: false})
  };

  return (
    <div className="App">
    <AuthProvider value={{authState, setAuthState}}>
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
                <Nav.Link href="/profile">
                  Welcome, {authState.name}
                </Nav.Link>
                  {authState.status && <Button onClick={ logout } variant="outline-success"> Logout</Button>}
              </Nav>
            </>
              )}

        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* public routes*/}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/composers" element={<Composers />}></Route>
        <Route path="/pieces/:ComposerId" element={<Pieces />}></Route>
        <Route path="/files/:PieceId" element={<Files />}></Route>
        <Route path="/Profile" element={<Profile />}></Route>
        <Route path="/unauthorised" element={<Unauthorised />}></Route>
        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/admin/files/add" element={<CreateFile />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/admin/stream/add" element={<Upload />}></Route>
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
