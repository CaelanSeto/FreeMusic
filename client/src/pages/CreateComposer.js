import React, {useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

function CreateComposer() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const initialValues = {name: "", biography: ""}; 
      
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(60).matches(/\w+([, ]+\w+){1,2}/, 'Is not a correct format').required(),
        biography: Yup.string().max(10000).required()
    });

    const onSubmit =(data) => {
        axios.post("http://18.217.161.38:3001/composers/add", data, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                usenavigate("/admin/composers");
            }
        });
    };

    return (
     <div className="container">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/composers"><p style={{color: 'black'}}>Back to Composers</p></Link>
          <br></br><br></br><br></br>
            <h2>Add Composer</h2>
            <br></br>
          <div className="form-group">
            <label>Composer Name:</label>
            <Field className="form-control"  name="name" placeholder="FamilyName, FirstName"/>
            <ErrorMessage name="name" component="span"/>
          </div>
          <br></br>
          <div className="form-group">
            <label>Biography:</label>
            <Field  as="textarea" className="form-control" name="biography"/>
            <ErrorMessage name="biography" component="span"/>
          </div>
          <br></br><br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <button type="submit" className="btn btn-dark">Add Composer</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
  );
}

export default CreateComposer

