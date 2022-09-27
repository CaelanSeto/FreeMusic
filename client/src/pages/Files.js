import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';

import MIDIAccess from '../MIDI/MIDIAccess';

function Files() {


  const [listOfFiles, setListOfFiles] = useState([]);
  const [composerId, setComposerId] = useState([]);
  const [composerName, setComposerName] = useState([]);
  const [pieceTitle, setPieceTitle] = useState([]);
  // const [piece, setPiece] = useState([]);
  // const [composer, setComposer] = useState([]);
  // const usenavigate = useNavigate();

  let { PieceId } = useParams();




  useEffect(() => {
    axios.get(`http://18.217.161.38:3001/files/${PieceId}`).then((response) => {
      if (response.data) {
        setListOfFiles(response.data);
      }
      else {
        setListOfFiles(null);
      }
    });

    axios.get(`http://18.217.161.38:3001/pieces/byId/${PieceId}`).then((response) => {
      if (response.data) {
        setComposerId(response.data.ComposerId);
        setPieceTitle(response.data.title);
        console.log(response.data);
      }
      else {
        setComposerId(null);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`http://18.217.161.38:3001/composers/byId/${composerId}`).then((response) => {
      if (response.data) {
        setComposerName(response.data.name);
      }
      else {
        setComposerName(null);
      }
    });
  }, [composerId]);


  /*
  https://freeclassicmusic.s3.us-east-2.amazonaws.com/lacrymosa.mp3
  */


  return (
    <div>
      <Container>
        <br></br>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/composers">Composers</Breadcrumb.Item>
          <Breadcrumb.Item href={`/pieces/${composerId}`}>{composerName}</Breadcrumb.Item>
          <Breadcrumb.Item active>{pieceTitle}</Breadcrumb.Item>
        </Breadcrumb>
        <br></br>
        <Card.Title>{pieceTitle}</Card.Title>
        <br></br>
        {listOfFiles.map((value) => {
          window.pieceTitle = value.title;
          function toggle() {
            var x = document.getElementById(`toggle${value.uuid}`);
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }

          function docType() {
            if (`${value.type}` === 'recording') {
              return <audio
                controls
                src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.uuid}`}>

              </audio>
            } if (`${value.type}` === 'sheetmusic') {
              return <iframe src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.uuid}#toolbar=0`} width="90%" height="900px" />
            }
          }

          return (
            <div key={value.file}>
              <Card style={{ width: '100%', height: '100%'}}>
                <br></br>
                <Card.Title>{value.file}</Card.Title>
                <Card.Text>{value.type}</Card.Text>
                <a href={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.uuid}`} target="_blank" rel="noreferrer">
                  <div>
                    <Button className="btn-secondary" size="sm" 
                      onClick={() => {
                        axios.post("http://18.217.161.38:3001/downloads/add", {
                          UserId: localStorage.getItem("userId"),
                          FileId: value.id
                      })}}>Download</Button>
                  </div>
                </a>
                <br></br>
                <Button className="btn btn-dark" onClick={toggle} size="sm">View/Hide the file</Button>
                <br></br><br></br>
                <div id={`toggle${value.uuid}`}>
                  {docType()}
                </div>
              </Card>

            </div>
          );
        })}
        <br></br>
        <p>Click on the button below if you want to play the sheets on your MIDI device:</p>
        <div> <Button className="btn btn-dark" id="MIDIbutton">Start MIDI plugin</Button></div>
      </Container>
    </div>
  )

}


export default Files;