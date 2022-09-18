import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";

// BOOTSTRAP CSS
import NavbarComponent from "./components/NavbarComponent";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";



function App() {
  //TODO
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}></AuthContext.Provider>
        <Router>
          <div classname="navbar-tempname">
            <div classname="links-tempname">
            {!authState.status ? (
                <>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/registration">
                    <Button>
                      Registration
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <Button>Home Page</Button>
                    </Link>
                  <Link to="/composers">
                    Composers
                    </Link>
                  <Link to="/pieces">
                    Pieces
                    </Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Routes>
            <Route path="/" exact component={Home} >

            </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
