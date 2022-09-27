import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom';

function EditFile() {

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [file, setFile] = useState([]);
    const [piecesList, setPiecesList] = useState([]);
    let { id } = useParams(); 
   
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(260).matches(/^\S*$/, 'No spaces allowed').required(),
        file: Yup.string().min(3).max(260).matches(/^\S*$/, 'No spaces allowed').required(),
        uuid: Yup.string().max(360).matches(/^\S*$/, 'No spaces allowed').required(),
        PieceId: Yup.number().required(),
        type: Yup.string().oneOf(["recording", "sheetmusic"]).required(),
        description: Yup.string().max(1000).required(),
        instruments: Yup.string().min(3).required()
    });

    useEffect(() => {
        axios.get(`http://18.217.161.38:3001/files/byId/${id}`).then((response) =>{
                setFile(response.data);
        });
        axios.get(`http://18.217.161.38:3001/pieces`).then((response) =>{
                setPiecesList(response.data);
        });
    }, []);

      const onSubmit = (data) => {
         axios.patch(`http://18.217.161.38:3001/files/edit/${id}`, data, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          }
        }).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                usenavigate("/admin/files");
            }
        });
      };

      const CustomInputComponent = (props) => (
        <input className="form-control" type="text" {...props} />
      );
  
    return (
     <div className="container">
        <Formik initialValues={{
            title: file.title, 
            file: file.file,
            uuid: file.uuid,
            PieceId: file.PieceId,
            type: file.type,
            description: file.description,
            instruments: file.instruments
            }} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/files"><p style={{color: 'black'}}>Back to Files</p></Link>
          <br></br><br></br><br></br>
            <h2>Edit File</h2>
            <br></br>

          <div class="form-group">
            <label>Title:</label>
            <Field className="form-control" as={CustomInputComponent} name="title" defaultValue={file.title}/>
            <ErrorMessage name="title" component="span"/>
          </div>
          <br></br>

           <div class="form-group">
            <label>File Name:</label>
            <Field className="form-control" as={CustomInputComponent} name="file" defaultValue={file.file}/>
            <ErrorMessage name="file" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>UUID:</label>
            <Field className="form-control" as={CustomInputComponent} name="uuid" defaultValue={file.uuid}/>
            <ErrorMessage name="uuid" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Type:</label>
            <Field as="select" name="type" className="form-control">
             <option value={file.type}>{file.type}</option>
             <option value="recording">recording</option>
             <option value="sheetmusic">sheetmusic</option>
           </Field>
            <ErrorMessage name="type" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Description:</label>
            <Field  as="textarea" className="form-control" name="description" defaultValue={file.description}/>
            <ErrorMessage name="description" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Instruments:</label>
            <Field as="select" name="instruments" className="form-control">
             <option value={file.instruments}>{file.instruments}</option>
             <option value="Bass">Bass</option>
             <option value="Bassoon">Bassoon</option>
            <option value="Bass drum">Bass drum</option>
            <option value="Cello">Cello</option>
            <option value="Clarinet">Clarinet</option>
            <option value="Cymbal">Cymbal</option>
            <option value="Double bass">Double bass</option>
            <option value="English Horn">English Horn</option>
            <option value="Flute">Flute</option>
            <option value="French Horn">French Horn</option>
            <option value="Gong">Gong</option>
            <option value="Oboe">Oboe</option>
            <option value="Piano">Piano</option>
            <option value="Piccolo">Piccolo</option>
            <option value="Snare drum">Snare drum</option>
            <option value="Timpani">Timpani</option>
            <option value="Triangle">Triangle</option>
            <option value="Trombone">Trombone</option>
            <option value="Trumpet">Trumpet</option>
            <option value="Tuba">Tuba</option>
            <option value="Viola">Viola</option>
            <option value="Violin">Violin</option>
           </Field>
            <ErrorMessage name="instruments" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Piece Id:</label>
            <Field as="select" name="PieceId" className="form-control">
             <option value={file.PieceId}>{file.PieceId}</option>
             {piecesList.map((val) => {
                return (
                    <option value={val.id}>{val.title}</option>
                );
            })}
           </Field>
            <ErrorMessage name="PieceId" component="span"/>
          </div>
          <br></br><br></br><br></br>
            <p style={{color: 'red'}}>{errorMessage}</p>
            <button type="submit" className="btn btn-dark">Edit File</button>
            <br></br><br></br>
          </Form>
        </Formik>
     </div>
    );
}

export default EditFile

