import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { Link } from "react-router-dom";

function AdminComposers() {
  
  const [composersList, setComposersList] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/composers").then((response) =>{
        if(response.data.error) {
            setErrMessage(response.data.error);
        }
        else{
            setComposersList(response.data);
        }  
    });
  }, []);

  const deleteComposer = (id) => {
    axios.delete(`http://localhost:3001/composers/delete/${id}`);
    window.location.reload(true);
  };

  return (
    <div className="App">
        <br></br>
      <h2>List of Composers</h2>
      <br></br>
      
      <Link to="/admin/composers/add"><button className="btn btn-dark">add new composer</button></Link>
      <br></br><br></br>
      <h3 style={{color: 'red'}}>{errMessage}</h3>
      <br></br>
      <div>	
			    <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>ID</th>
						    <th>Name</th>
						    <th>Biography</th>
                <th>Updated At</th>
						    <th>Update &nbsp;&nbsp; | &nbsp;&nbsp; Delete</th>
					    </tr>
				    </thead>
				    <tbody>
            {composersList.map((val) => {
            return (
					    <tr>
						    <td>{val.id}</td>
						    <td>{val.name}</td>
						    <td>{val.biography}</td>
                <td>{val.updatedAt}</td>
						    <td>
                                <Link to={`/admin/composers/edit/${val.id}`}>
                                    <button className="btn btn-dark">Update</button>
                                </Link>
                                &nbsp;&nbsp;
                                    <button onClick={() => {deleteComposer(val.id)}} className="btn btn-secondary">Delete</button> 	    
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
export default AdminComposers;