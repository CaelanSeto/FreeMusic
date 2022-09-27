import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
//import NavbarComponent from "./components/NavbarComponent";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Composers from "./pages/Composers";
import Pieces from "./pages/Pieces";
import Files from "./pages/Files";
import Profile from "./pages/Profile";
import Donations from "./pages/Donations";

/****************************************
 * searchbar *
*/
import SearchBar from './searchbar/SearchBar';


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

import { Person } from 'react-bootstrap-icons';
import AdminStat from "./pages/AdminStat";

import { ContactUs } from "./pages/ContactUs";


function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
    name: "",
    role: "",
    status: false,
  });


  // USE AXIOS INSTANCE INSTEAD OF STATIC AXIOS FOR CONFIG --- TODO ---
  let axiosInst = axios.create({
    baseURL: "http://18.217.161.38:3001" //change this so it's not hardcoded
  });

  const [listOfPieces, setListOfPieces] = useState([]);

  useEffect(() => {
    axiosInst.get("/users/auth", {
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
  useEffect(() => {
    axiosInst.get(`/pieces`).then((response) => {
      if (response.data) {
        setListOfPieces(response.data);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("linkToFiles");
    localStorage.removeItem("userId");
    localStorage.removeItem("status");
    setAuthState({ email: "", id: 0, name: "", role: "", status: false });
  };
  const user = localStorage.getItem("status");
  const admin = localStorage.getItem("role");

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
                  {!authState.status ? (
                    <>
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/profile">
                        &nbsp;{authState.name}&nbsp;<Person></Person>
                      </Nav.Link>
                    </>
                  )}

                </Nav>
                {admin && (
                  <>
                    <Nav className="ml-auto">
                      <Button variant="outline-light" href="/admin" className="me-3" style={{ color: 'yellow' }}>Admin Dashboard</Button>
                    </Nav>
                  </>
                )}

                <SearchBar placeholder="Enter Piece name..." data={listOfPieces} />
                <Nav className="ml-auto">
                  <Button variant="outline-light" href="/contact" className="me-3">Contact Us</Button>
                </Nav>
                {!authState.status ? (
                  <>
                    <Nav className="ml-auto">
                      <Button variant="outline-light" href="/login" className="me-3">Login/Register</Button>
                    </Nav>
                  </>
                ) : (
                  <>
                    <Nav className="ml-auto">
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
            <Route path="/contact" element={<ContactUs />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/composers" element={<Composers />}></Route>
            <Route path="/pieces/:ComposerId" element={<Pieces />}></Route>


            <Route path="/files/:PieceId" element={<ProtectedRoute redirectPath="/login" isAllowed={
              user}> <Files /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute redirectPath="/login" isAllowed={
              user}> <Profile /></ProtectedRoute>} />
            <Route path="/donations" element={<ProtectedRoute redirectPath="/login" isAllowed={
              user}> <Donations /></ProtectedRoute>} />


            <Route path="/admin" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <Dashboard /></ProtectedRoute>} />

            <Route path="/admin/users" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <AdminUsers /></ProtectedRoute>} />

            <Route path="/admin/users/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <EditUser /></ProtectedRoute>} />

            <Route path="/admin/composers" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <AdminComposers /></ProtectedRoute>} />

            <Route path="/admin/composers/add" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <CreateComposer /></ProtectedRoute>} />

            <Route path="/admin/composers/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <EditComposer /></ProtectedRoute>} />

            <Route path="/admin/pieces" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <AdminPieces /></ProtectedRoute>} />

            <Route path="/admin/pieces/add" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <CreatePiece /></ProtectedRoute>} />

            <Route path="/admin/pieces/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <EditPiece /></ProtectedRoute>} />

            <Route path="/admin/files" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <AdminFiles /></ProtectedRoute>} />

            <Route path="/admin/files/add" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <CreateFile /></ProtectedRoute>} />

            <Route path="/admin/files/edit/:id" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <EditFile /></ProtectedRoute>} />

            <Route path="/admin/statistics" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <AdminStat /></ProtectedRoute>} />

            <Route path="/admin/uploads" element={<ProtectedRoute redirectPath="/" isAllowed={
              admin}> <UploadFiles /></ProtectedRoute>} />

            <Route path="*" element={<p>There's nothing here: 404!</p>}></Route>

          </Routes>
        </Router>
        <footer className="pt-3 mt-4 bg-light text-muted border-top">
          <div className="container p-4 pb-0">
            <section className="">
              {/*Currently placeholder for better future footer*/}
              <form action="">
                <div className="row d-flex justify-content-center">
                  <div className="col-auto">
                    <p className="pt-2">
                      <strong>Sign up for our newsletter (filler)</strong>
                    </p>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-outline form-white mb-4">
                      <input type="email" id="form5Example2" className="form-control" />
                      <label className="form-label" htmlFor="form5Example2">Email address (Currently non-functional)</label>
                    </div>
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-outline-dark mb-4">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>

          <div className="text-center p-3">
            &copy; 2022 FreeMusic DB
          </div>
        </footer>
      </AuthContext.Provider>
    </div>
  );
}
export default App;
