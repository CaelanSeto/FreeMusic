import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
import { useState , useEffect} from "react";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./pages/Home";
import Login from "./pages/Login";
import Composers from "./pages/Composers";
import Pieces from "./pages/Pieces";
import Files from "./pages/Files";

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
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
    <div className="navbar-tempname">
            <div className="links-tempname">
              <NavbarComponent authState = {authState}/>
              
            </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/composers" element={<Composers />}></Route>
        <Route path="/pieces/:ComposerId" element={<Pieces />}></Route>
        <Route path="/files/:PieceId" element={<Files />}></Route>
      </Routes>
    </Router>
    </AuthContext.Provider>
    </div>
  );
}

export default App;
