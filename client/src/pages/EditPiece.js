import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom';

function EditPiece() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [piece, setPiece] = useState([]);
    const [composersList, setComposersList] = useState([]);
    let { id } = useParams(); 
    
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(100).required(),
        ComposerId: Yup.number().required()
    });

    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/pieces/byId/${id}`).then((response) =>{
                setPiece(response.data);
        });
        axios.get(`http://18.217.161.38:3001/composers`).then((response) =>{
                setComposersList(response.data);
        });
    }, []);

      const onSubmit = (data) => {
         axios.patch(`http://18.217.161.38:3001/pieces/edit/${id}`, data, {
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

      const CustomInputComponent = (props) => (
        <input className="form-control" type="text" {...props} />
      );
  
    return (
     <div className="container">
        <Formik initialValues={{title: piece.title, ComposerId: piece.ComposerId}} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/pieces"><p style={{color: 'black'}}>Back to Pieces</p></Link>
          <br></br><br></br><br></br>
            <h2>Edit Piece</h2>
            <br></br>
          <div class="form-group">
            <label>Title:</label>
            <Field name="title" as={CustomInputComponent} defaultValue={piece.title}/>
            <ErrorMessage name="title" component="span"/>
          </div>
          <br></br>
          <div class="form-group">
            <label>ComposerId:</label>
            <Field as="select" name="ComposerId" className="form-control">
             <option value={piece.ComposerId}>{piece.ComposerId}</option>
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
            <button type="submit" className="btn btn-dark">Edit Piece</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
    );
}

export default EditPiece

