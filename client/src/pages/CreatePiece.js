import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

function CreatePiece() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [composersList, setComposersList] = useState([]);

    const initialValues = {title: "", ComposerId: null}; 
      
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(100).required(),
        ComposerId: Yup.number().required()
    });

    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/composers`).then((response) =>{
                setComposersList(response.data);
        });
    }, []);

    const onSubmit =(data) => {
        axios.post("http://18.217.161.38:3001/pieces/add", data, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                usenavigate("/admin/pieces");
            }
        });
    };

    return (
     <div className="container">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/pieces"><p style={{color: 'black'}}>Back to Pieces</p></Link>
          <br></br><br></br><br></br>
            <h2>Add Piece</h2>
            <br></br>
          <div class="form-group">
            <label>Title:</label>
            <Field className="form-control"  name="title" placeholder="enter title..."/>
            <ErrorMessage name="title" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>ComposerId:</label>
            <Field as="select" name="ComposerId" className="form-control">
             <option value=""></option>
             {composersList.map((val) => {
                return (
                    <option value={val.id}>{val.name}</option>
                );
            })}
           </Field>
            <ErrorMessage name="ComposerId" component="span"/>
          </div>
          <br></br><br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <button type="submit" className="btn btn-dark">Add Piece</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
  );
}

export default CreatePiece

