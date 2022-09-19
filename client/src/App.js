import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Composers from "./pages/Composers";
import Pieces from "./pages/Pieces";
import Files from "./pages/Files";
import { AuthContext } from "./helpers/AuthContext";
import { useState , useEffect} from "react";
import axios from "axios";

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
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
        <div className="navbar">
        <Link to ="/">Home</Link>
        {!authState.status && (
        <>
        <Link to ="/login">Login</Link>
        </>
        )} 
        </div>
        <div className="loggedInContainer">
        <h1>{authState.email}</h1>
         {authState.status && <button onClick={logout}> Logout </button>}
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
