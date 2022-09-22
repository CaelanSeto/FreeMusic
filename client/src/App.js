import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect, setStatus } from "react";
import axios from "axios";
//import NavbarComponent from "./components/NavbarComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Composers from "./pages/Composers";
import Pieces from "./pages/Pieces";
import Files from "./pages/Files";
import Profile from "./pages/Profile";

/*****************************************/
/*admin stuff */
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

//files CRUD
import AdminComposers from "./pages/AdminComposers";
import CreateComposer from "./pages/CreateComposer";
import EditComposer from "./pages/EditComposer";

import AdminUsers from "./pages/AdminUsers";
import EditUser from "./pages/EditUser";

import AdminPieces from "./pages/AdminPieces";
import CreatePiece from "./pages/CreatePiece";
import EditPiece from "./pages/EditPiece";

import AdminFiles from "./pages/AdminFiles";
import CreateFile from "./pages/CreateFile";
import EditFile from "./pages/EditFile";
import UploadFiles from "./pages/UploadFiles";


function App () {
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
        setAuthState({ ...authState, status: false });
      } else {
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
    setAuthState({ email: "", id: 0, name: "", role: "", status: false });
  };

  const admin = () => {
    localStorage.getItem("accessToken");
    if (authState.role === "admin") {
      setStatus(true)
    }
  };

  //SEARCHBAR TO DO
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar bg="dark" collapseOnSelect expand="lg" variant="dark">
            <Container>
              <Navbar.Brand href="/">FreeMusic</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/composers">Composers</Nav.Link>
                  <Nav.Link href="/donations">Donations</Nav.Link>
                </Nav>
                {authState.role === "admin" && (
                  <>
                    <Nav className="ml-auto">
                      <Button variant="outline-light" href="/admin" className="me-3" style={{ color: 'yellow' }}>Admin Dashboard</Button>
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
                      {authState.status && <Button onClick={logout} href="/logout" variant="outline-light"> Logout</Button>}
                    </Nav>
                  </>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/composers" element={<Composers />}></Route>
            <Route path="/pieces/:ComposerId" element={<Pieces />}></Route>
            <Route path="/files/:PieceId" element={<Files />}></Route>
            <Route path="/Profile" element={<Profile />}></Route>

            <Route element={<ProtectedRoute isAllowed={ admin } />}>

              <Route path="/admin" element={<ProtectedRoute redirectPath="/" isAllowed={
              authState.role === "admin" }> <Dashboard /></ProtectedRoute>} />

              <Route path="/admin/users" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <AdminUsers /></ProtectedRoute>} />

              <Route path="/admin/users/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <EditUser /></ProtectedRoute>} />

              <Route path="/admin/composers" element={<ProtectedRoute redirectPath="/" isAllowed={
                 authState.role === "admin"}> <AdminComposers /></ProtectedRoute>} />

              <Route path="/admin/composers/add" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <CreateComposer /></ProtectedRoute>} />

              <Route path="/admin/composers/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <EditComposer /></ProtectedRoute>} />

              <Route path="/admin/pieces" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <AdminPieces /></ProtectedRoute>} />

              <Route path="/admin/pieces/add" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <CreatePiece /></ProtectedRoute>} />

              <Route path="/admin/pieces/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <EditPiece /></ProtectedRoute>} />

              <Route path="/admin/files" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <AdminFiles /></ProtectedRoute>} />

              <Route path="/admin/files/add" element={<ProtectedRoute redirectPath="/" isAllowed={
                authState.role === "admin"}> <CreateFile /></ProtectedRoute>} />

              <Route path="/admin/files/edit/:id" element={<ProtectedRoute redirectPath="/home" isAllowed={
              authState.role === "admin"}> <EditFile /></ProtectedRoute>} />

              <Route path="/admin/uploads" element={<ProtectedRoute redirectPath="/home" isAllowed={
                authState.role === "admin"}> <UploadFiles /></ProtectedRoute>} />

            </Route>
            <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>

          </Routes>
        </Router>
        <footer className="pt-3 mt-4 text-muted border-top">
          &copy; placeholder footer
        </footer>
        <br></br>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
