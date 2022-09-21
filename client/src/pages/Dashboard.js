import React from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
  
  return (
    <div className="container">
      <br></br><br></br><br></br>
      <h2>Admin Dashboard</h2>
      <br></br><br></br>
      <Link to="/admin/users"><button className="btn btn-dark">Users</button></Link>
      <br></br><br></br>
      <Link to="/admin/composers"><button className="btn btn-dark">Composers</button></Link>
      <br></br><br></br>
      <Link to="/admin/pieces"><button className="btn btn-dark">Pieces</button></Link>
      <br></br><br></br>
      <Link to="/admin/files"><button className="btn btn-dark">Files</button></Link> 
      <br></br><br></br>
      <Link to="/admin/uploads"><button className="btn btn-dark">Uploads</button></Link> 
      <br></br><br></br>
    </div>
  )
}

export default Dashboard
