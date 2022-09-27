import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';


function Profile() {

    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState([]);
    const [success, setSuccess] = useState("");
    const [downloads, setDownloads] = useState([]);
    const [errMessage, setErrMessage] = useState("");
    const [err1Message, setErr1Message] = useState("");
    const [donations, setDonations] = useState([]);
  
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(100).required(),
        password: Yup.string().min(6).max(12).required()
    });

    let id = localStorage.getItem("userId");
    const usenavigate = useNavigate();

    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/users/${id}`).then((response) =>{
                setUser(response.data);
        });
    }, []);

      const onSubmit = (data) => {
         axios.patch(`http://18.217.161.38:3001/users/edit/profile/${id}`, data).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                setSuccess("Changed successfully!")
            }
        });
      };

      useEffect(() => {
        axios.get(`http://18.217.161.38:3001/downloads/userId/${id}`).then((response) =>{
          if(response.data.error) {
              setErrMessage(response.data.error);
          }
          else{
              setDownloads(response.data);
          }           
        });
    }, []);

    useEffect(() => {
      axios.get(`http://18.217.161.38:3001/donations/${id}`).then((response) =>{
        if(response.data.error) {
            setErr1Message(response.data.error);
        }
        else{
            setDonations(response.data);
        }           
      });
    }, []);

    const formatDate = (dateString) => {
      const options = { year: "numeric", month: "long", day: "numeric"}
      return new Date(dateString).toLocaleDateString(undefined, options)
    }

      const CustomInputComponent = (props) => (
        <input className="form-control" type="text" {...props} />
      );

    return (
     <div className="container">
        <Formik initialValues={{name: user.name, password: ""}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
            <h2>Welcome, {user.name}!</h2>
            <br></br>
          <div className="form-group">
            <label>Name:</label>
            <Field name="name" as={CustomInputComponent} onClick={() => {
                                            setErrorMessage("");
                                            setSuccess("");
                                        }} defaultValue={user.name}/>
            <ErrorMessage name="name" component="span"/>
          </div>
          <br></br>
          
          <div className="form-group">
            <label>Password:</label>
            <Field name="password" type="password" className="form-control" onClick={() => {
                                            setErrorMessage("");
                                            setSuccess("");
                                        }}/>
            <ErrorMessage name="password" component="span"/>
          </div>
          <br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <p style={{color: 'green'}}>{success}</p>
            <button type="submit" className="btn btn-dark">Change</button>
            <br></br><br></br>
          </Form>
        </Formik>
        <br></br>
        <h4>My downloads:</h4>
        <br></br>
        <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>File</th>
						    <th>Date</th>
					    </tr>
				    </thead>
				    <tbody>
            {downloads.map((val) => {
            return (
					    <tr key={val.id} className = "profile" onClick={() => {usenavigate(`/files/${val.FileId}`)}}>
						    <td>{val.FileId}</td>
						    <td>{formatDate(val.createdAt)}</td>
					    </tr>
              );
            })}
				    </tbody>
			    </table>
          <p style={{color: 'red'}}>{errMessage}</p>
          <br></br>
        <h4>My donations:</h4>
        <br></br>
        <table className="table table-striped table-bordered">
				    <thead className="thead-dark">
					    <tr>
						    <th>Amount $</th>
                <th>Operation ID</th>
						    <th>Date</th>
					    </tr>
				    </thead>
				    <tbody>
            {donations.map((val) => {
            return (
					    <tr key={val.id} className = "profile">
						    <td>{val.amount}</td>
                <td>{val.operationId}</td>
						    <td>{formatDate(val.createdAt)}</td>
					    </tr>
              );
            })}
				    </tbody>
			    </table>
          <p style={{color: 'red'}}>{err1Message}</p>
     </div>
    );
}

export default Profile

