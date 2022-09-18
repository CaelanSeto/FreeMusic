import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState , useEffect} from "react";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent"
import NavbarCompLoggedIn from "./components/NavbarCompLoggedIn"
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  const [authState, setAuthState] = useState({
    email: "",
    id: 0,
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
        setAuthState({
          email: response.data.email,
          id: response.data.id,
          status: true,
        });
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false})
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar-tempname">
            <div className="links-tempname">
              {!authState.status ? (
                <>
                  <NavbarComponent/>
                </>
              ) : (
                <>
                  <NavbarCompLoggedIn/>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{authState.email} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
