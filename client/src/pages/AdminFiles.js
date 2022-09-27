import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { Link } from "react-router-dom";

function AdminFiles() {
  
  const [filesList, setFilesList] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    axios.get("http://18.217.161.38:3001/files", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) =>{
        if(response.data.error) {
            setErrMessage(response.data.error);
        }
        else{
            setFilesList(response.data);
        }
    });
  }, []);

  const deleteFile = (id) => {
    axios.delete(`http://18.217.161.38:3001/files/delete/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });
    window.location.reload(true);
  };

  return (
    <div className="container">
        <br></br>
      <h2>List of Files</h2>
      <br></br>
      
      <Link to="/admin/files/add"><button className="btn btn-dark">add new file</button></Link>
      <br></br><br></br>
      <h3 style={{color: 'red'}}>{errMessage}</h3>
      <br></br>
      <div>	
			    <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>ID</th>
						    <th>Title</th>
						    <th>File Name</th>
                <th>UUID</th>
						    <th>Type</th>
						    <th>Description</th>
						    <th>Instruments</th>
                <th>Piece ID</th>
                <th>Updated At</th>
						    <th>Update &nbsp; / &nbsp;Delete</th>
					    </tr>
				    </thead>
				    <tbody>
            {filesList.map((val) => {
            return (
					    <tr key={val.id}>
						    <td>{val.id}</td>
						    <td>{val.title}</td>
						    <td>{val.file}</td>
                <td>{val.uuid}</td>
						    <td>{val.type}</td>
						    <td>{val.description}</td>
						    <td>{val.instruments}</td>
                <td>{val.PieceId}</td>
                <td>{val.updatedAt}</td>
						    <td>
                                <Link to={`/admin/files/edit/${val.id}`}>
                                    <button className="btn btn-dark">Update</button>
                                </Link>
                                <br></br><br></br>
                                    <button onClick={() => {deleteFile(val.id)}} className="btn btn-secondary">Delete</button> 	    
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
export default AdminFiles;
