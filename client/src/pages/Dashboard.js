import React from 'react';
import { Link } from "react-router-dom";

function Dashboard() {
  
  return (
    <div className="container">
      <br></br><br></br><br></br>
      <h2>Admin Dashboard</h2>
      <br></br><br></br>
      <Link to="/admin/users"><button className="btn btn-dark dashboard">Users</button></Link>
      <br></br><br></br>
      <Link to="/admin/composers"><button className="btn btn-dark dashboard">Composers</button></Link>
      <br></br><br></br>
      <Link to="/admin/pieces"><button className="btn btn-dark dashboard">Pieces</button></Link>
      <br></br><br></br>
      <Link to="/admin/files"><button className="btn btn-dark dashboard">Files</button></Link> 
      <br></br><br></br>
      <Link to="/admin/statistics"><button className="btn btn-dark dashboard">Statistics</button></Link> 
      <br></br><br></br>
      <Link to="/admin/uploads"><button className="btn btn-dark dashboard">Uploads</button></Link> 
      <br></br><br></br>
    </div>
  )
}

export default Dashboard
