import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom';

function EditComposer() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [composer, setComposer] = useState([]);
    let { id } = useParams(); 
    
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(60).matches(/\w+([, ]+\w+){1,2}/, 'Is not a correct format').required(),
        biography: Yup.string().max(10000).required()
    });

    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/composers/byId/${id}`).then((response) =>{
                setComposer(response.data);
        });
    }, []);

      const onSubmit = (data) => {
         axios.patch(`http://18.217.161.38:3001/composers/edit/${id}`, data, {
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

      const CustomInputComponent = (props) => (
        <input className="form-control" type="text" {...props} />
      );
  
    return (
     <div className="container">
        <Formik initialValues={{name: composer.name, biography: composer.biography}} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/composers"><p style={{color: 'black'}}>Back to Composers</p></Link>
          <br></br><br></br><br></br>
            <h2>Edit Composer</h2>
            <br></br>
          <div class="form-group">
            <label>Composer Name:</label>
            <Field name="name" as={CustomInputComponent} defaultValue={composer.name}/>
            <ErrorMessage name="name" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>Biography:</label>
            <Field  as="textarea" defaultValue={composer.biography} className="form-control" name="biography"/>
            <ErrorMessage name="biography" component="span"/>
          </div>
          <br></br><br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <button type="submit" className="btn btn-dark">Edit Composer</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
    );
}

export default EditComposer

