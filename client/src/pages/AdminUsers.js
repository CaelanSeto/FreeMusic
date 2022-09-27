import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { Link } from "react-router-dom";

function AdminUsers() {
  
  const [usersList, setUsersList] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    axios.get("http://18.217.161.38:3001/users", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) =>{
        if(response.data.error) {
            setErrMessage(response.data.error);
        }
        else{
          setUsersList(response.data);
        }  
    });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://18.217.161.38:3001/users/delete/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });
    window.location.reload(true);
  };

  return (
    <div className="container">
        <br></br>
      <h2>List of Users</h2>
      <br></br>
      <h3 style={{color: 'red'}}>{errMessage}</h3>
      <br></br>
      <div>	
			    <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>ID</th>
						    <th>Email</th>
						    <th>Name</th>
                <th>Role</th>
                <th>Status</th>
                <th>Updated At</th>
						    <th>Update &nbsp;&nbsp; | &nbsp;&nbsp; Delete</th>
					    </tr>
				    </thead>
				    <tbody>
            {usersList.map((val) => {
            return (
					    <tr key={val.id}>
						    <td>{val.id}</td>
						    <td>{val.email}</td>
                <td>{val.name}</td>
                <td>{val.role}</td>
                <td>{val.status}</td>
						    <td>{val.updatedAt}</td>
						    <td>
                                <Link to={`/admin/users/edit/${val.id}`}>
                                    <button className="btn btn-dark">Update</button>
                                </Link>
                                &nbsp;&nbsp;
                                    <button onClick={() => {deleteUser(val.id)}} className="btn btn-secondary">Delete</button> 	    
						    </td>
					    </tr>
              );
            })}
				    </tbody>
			    </table>
		    </div>     
    </div>
  );
}
export default AdminUsers;
