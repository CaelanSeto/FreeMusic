import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from 'axios';
import { Link } from "react-router-dom";

function AdminComposers() {

  const [composersList, setComposersList] = useState([]);
  const [errMessage, setErrMessage] = useState("");

  useEffect(() => {
    axios.get("http://18.217.161.38:3001/composers", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) => {
      if (response.data.error) {
        setErrMessage(response.data.error);
      }
      else {
        setComposersList(response.data);
      }
    });
  }, []);

  const deleteComposer = (id) => {
    axios.delete(`http://18.217.161.38:3001/composers/delete/${id}`, {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    });
    window.location.reload();
  };

  return (
    <div className="container">
      <br></br>
      <h2>List of Composers</h2>
      <br></br>

      <Link to="/admin/composers/add"><button className="btn btn-dark">add new composer</button></Link>
      <br></br><br></br>
      <h3 style={{ color: 'red' }}>{errMessage}</h3>
      <br></br>
      <div>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Biography</th>
              <th>Updated At</th>
              <th>Update &nbsp; / &nbsp;Delete</th>
            </tr>
          </thead>
          <tbody>
            {composersList.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.id}</td>
                  <td>{val.name}</td>
                  <td style={{ width: "25%" }}>
                    <div className='composersTd'>
                      {val.biography}
                    </div>
                  </td>
                  <td>{val.updatedAt}</td>
                  <td>
                    <Link to={`/admin/composers/edit/${val.id}`}>
                      <button className="btn btn-dark">Update</button>
                    </Link>
                    <br></br><br></br>
                    <button onClick={() => { deleteComposer(val.id) }} className="btn btn-secondary">Delete</button>
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
