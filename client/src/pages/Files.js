import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';

import MIDIAccess from "../MIDI/MIDIAccess";

function Files() {
<MIDIAccess />

  
  const [listOfFiles, setListOfFiles] = useState([]);
  // const [piece, setPiece] = useState([]);
  // const [composer, setComposer] = useState([]);
  // const usenavigate = useNavigate();
  
  let { PieceId } = useParams();
  



  useEffect(() => {  
    axios.get(`http://localhost:3001/files/${PieceId}`).then((response) => {
        setListOfFiles(response.data);   
    });
  }, []);

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
        <Breadcrumb.Item href={`/pieces/${window.composerId}`}>{window.name}</Breadcrumb.Item>
        <Breadcrumb.Item active>{window.pieceTitle}</Breadcrumb.Item>
      </Breadcrumb>
          {listOfFiles.map((value) => {
            window.pieceTitle = value.title;
            function toggle() {
              var x = document.getElementById(`toggle${value.file}`);
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
                          src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.file}`}>
                            
                          </audio>
              } if (`${value.type}` === 'sheetmusic') {
                return <iframe src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.file}#toolbar=0`} width="80%" height="1000px" />
              }
            }

            return (
              <div>
                <Card style={{ width: '80vw'}}>
                  <br></br>
                  <Card.Title>{value.file}</Card.Title>
                  <Card.Text>{value.type}</Card.Text>
                    <a  href={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.file}`} target="_blank" rel="noreferrer">
                      <div>
                        <Button className="btn-secondary" size="sm">Download</Button>
                      </div>
                    </a>
                  <br></br>
                  <Button className="btn btn-dark" onClick={toggle} size="sm">View/Hide the file</Button>
                  <br></br><br></br>
                  <div id={`toggle${value.file}`}>
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