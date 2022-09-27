import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link, useParams } from 'react-router-dom';

function EditUser() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState([]);
    let { id } = useParams(); 
  
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(100).required(),
        password: Yup.string().min(6).max(12).required(),
        role: Yup.string().oneOf(['user', 'admin']).required(),
        status: Yup.number().oneOf([0, 1]).required()
    });


    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/users/${id}`).then((response) =>{
                setUser(response.data);
        });
    }, []);

      const onSubmit = (data) => {
         axios.patch(`http://18.217.161.38:3001/users/edit/${id}`, data, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                usenavigate("/admin/users");
                window.location.reload(true);

            }
        });
      };

      const CustomInputComponent = (props) => (
        <input className="form-control" type="text" {...props} />
      );

    return (
     <div className="container">
        <Formik initialValues={{name: user.name, role: user.role, status: user.status, password: ""}} 
            onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/users"><p style={{color: 'black'}}>Back to Users</p></Link>
          <br></br><br></br><br></br>
            <h2>Edit User</h2>
            <br></br>
          <div class="form-group">
            <label>Name:</label>
            <Field name="name" as={CustomInputComponent} defaultValue={user.name}/>
            <ErrorMessage name="name" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>Role:</label>
            <Field as="select" name="role" className="form-control">
             <option value={user.role}>{user.role}</option>
             <option value="user">user</option>
             <option value="admin">admin</option>
           </Field>
            <ErrorMessage name="role" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>Status:</label>
            <Field as="select" name="status" className="form-control">
             <option value={user.status}>{user.status}</option>
             <option value={0}>valid</option>
             <option value={1}>blocked</option>
           </Field>
            <ErrorMessage name="status" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>Password:</label>
            <Field name="password" type="password" className="form-control"/>
            <ErrorMessage name="password" component="span"/>
          </div>
          <br></br>
          <br></br><br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <button type="submit" className="btn btn-dark">Edit User</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
    );
}

export default EditUser

