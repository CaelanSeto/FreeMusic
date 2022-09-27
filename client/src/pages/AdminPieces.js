import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { Link } from "react-router-dom";

function AdminPieces() {
  
  const [piecesList, setPiecesList] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    axios.get("http://18.217.161.38:3001/pieces", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) =>{
        if(response.data.error) {
            setErrMessage(response.data.error);
        }
        else{
          setPiecesList(response.data);
        }  
    });
  }, []);

  const deletePiece = (id) => {
    axios.delete(`http://18.217.161.38:3001/pieces/delete/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });
    window.location.reload(true);
  };

  return (
    <div className="container">
        <br></br>
      <h2>List of Pieces</h2>
      <br></br>
      
      <Link to="/admin/pieces/add"><button className="btn btn-dark">add new piece</button></Link>
      <br></br><br></br>
      <h3 style={{color: 'red'}}>{errMessage}</h3>
      <br></br>
      <div>	
			    <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>ID</th>
						    <th>Title</th>
						    <th>Composer ID</th>
                <th>Updated At</th>
						    <th>Update &nbsp;&nbsp; | &nbsp;&nbsp; Delete</th>
					    </tr>
				    </thead>
				    <tbody>
            {piecesList.map((val) => {
            return (
					    <tr key={val.id}>
						    <td>{val.id}</td>
						    <td>{val.title}</td>
						    <td>{val.ComposerId}</td>
                <td>{val.updatedAt}</td>
						    <td>
                                <Link to={`/admin/pieces/edit/${val.id}`}>
                                    <button className="btn btn-dark">Update</button>
                                </Link>
                                &nbsp;&nbsp;
                                    <button onClick={() => {deletePiece(val.id)}} className="btn btn-secondary">Delete</button> 	    
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
export default AdminPieces;
