import React, {useEffect, useState} from 'react';
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import S3 from 'react-aws-s3';

// npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

function CreateFile() {
    //file upload to S3
    const [selectedFile, setSelectedFile] = useState(null);
    const [select, setSelect] = useState("");

    let usenavigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [piecesList, setPiecesList] = useState([]);

    // the configuration information is fetched from the .env file
    const config = {
      bucketName: process.env.REACT_APP_BUCKET_NAME,
      region: process.env.REACT_APP_REGION,
      accessKeyId: process.env.REACT_APP_ACCESS,
      secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
      setSelectedFile(e.target.files[0]);
    }

    const uploadFile = async (file) => {
      const ReactS3Client = new S3(config);
      // the name of the file uploaded is used to upload it to S3
      ReactS3Client
      .uploadFile(file, file.name)
      .then(data => console.log(data.location))
      .catch(err => console.error(err));
      setSelect("File uploaded!");
    }

    const initialValues = {title: "", type: "", description: "", instruments: "", uuid: "", PieceId: null}; 
      
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(3).max(260).matches(/^\S*$/, 'No spaces allowed').required(),
        PieceId: Yup.number().required(),
        type: Yup.string().oneOf(["recording", "sheetmusic"]).required(),
        description: Yup.string().max(1000),
        instruments: Yup.string().min(3).required(),
        uuid: Yup.string().max(360).matches(/^\S*$/, 'No spaces allowed').required()
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/pieces`).then((response) =>{
                setPiecesList(response.data);
        });
    }, []);

    const onSubmit =(data) => {
        axios.post("http://localhost:3001/files/add", data).then((response) => {
            if(response.data.error) {
                setErrorMessage(response.data.error);
            }
            else{
                usenavigate("/admin/files");
            }
        });
    };

    return (
     <div className="container">
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
          <br></br>
          <Link to="/admin/files"><p style={{color: 'black'}}>Back to Files</p></Link>
          <br></br><br></br><br></br>
            <h2>Add File</h2>
            <br></br>

          <div class="form-group">
            <label>File Name:</label>
            <Field className="form-control"  name="title" placeholder="enter file name without spaces..."/>
            <ErrorMessage name="title" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>UUID:</label>
            <Field className="form-control"  name="uuid" value={uuidv4()}/>
            <ErrorMessage name="uuid" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Type:</label>
            <Field as="select" name="type" className="form-control">
             <option value=""></option>
             <option value="recording">recording</option>
             <option value="sheetmusic">sheetmusic</option>
           </Field>
            <ErrorMessage name="type" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Description:</label>
            <Field  as="textarea" className="form-control" name="description"/>
            <ErrorMessage name="description" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Main instrument(s):</label>
            <Field as="select" name="instruments" className="form-control">
             <option disabled value="">Select instrument(s) here...</option>
             <optgroup label="Brass">
              <option value="French Horn">French Horn</option>
              <option value="Trombone">Trombone</option>
              <option value="Trumpet">Trumpet</option>
              <option value="Tuba">Tuba</option>
             </optgroup>
             <optgroup label="Percussion">
              <option value="Bass drum">Bass drum</option>
              <option value="Cymbal">Cymbal</option>
              <option value="Gong">Gong</option>
              <option value="Oboe">Oboe</option>
              <option value="Snare drum">Snare drum</option>
              <option value="Timpani">Timpani</option>
              <option value="Triangle">Triangle</option>
             </optgroup>
             <optgroup label="Piano">
              <option value="Piano">Piano</option>
             </optgroup>
             <optgroup label="Strings"> 
              <option value="Cello">Cello</option>
              <option value="Double bass">Double bass</option>
              <option value="Viola">Viola</option>
              <option value="Violin">Violin</option>
             </optgroup>
             <optgroup label="Woodwind">
              <option value="Bassoon">Bassoon</option>
              <option value="Clarinet">Clarinet</option>
              <option value="English Horn">English Horn</option>
              <option value="Flute">Flute</option>
              <option value="Piccolo">Piccolo</option>
             </optgroup>
             <optgroup label="Multiple">
              <option value="Duet">Duet</option>
              <option value="Orchestra">Orchestra</option>
              <option value="Quartet">Quartet</option>
              <option value="Trio">Trio</option>
             </optgroup>
           </Field>
            <ErrorMessage name="instruments" component="span"/>
          </div>
          <br></br>

          <div class="form-group">
            <label>Piece Id:</label>
            <Field as="select" name="PieceId" className="form-control">
             <option value=""></option>
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
            <button type="submit" className="btn btn-dark">Add File</button>
            <br></br><br></br>
          </Form>
        </Formik>
        <br></br>
                <p>Please attach the file with the UUID + .mp3 or .pdf! UUID is provided in this form!</p>
                <input className="btn btn-secondary" type="file" onChange={handleFileInput}/>
                <br></br><br></br>
                <button className="btn btn-dark" onClick={() => uploadFile(selectedFile)}>Upload to S3</button>
                <br></br><br></br>
                <h5 style={{color: 'green'}}>{select}</h5>
     </div>
  );
}

export default CreateFile


