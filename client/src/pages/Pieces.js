import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

function Pieces() {
   const [listOfPieces, setListOfPieces] = useState([]);
   const [composer, setComposer] = useState([]);
   const usenavigate = useNavigate();

   let { ComposerId } = useParams();

  useEffect(() => {  
    axios.get(`http://18.217.161.38:3001/composers/byId/${ComposerId}`).then((response) => {
        setComposer(response.data);
    });
    axios.get(`http://18.217.161.38:3001/pieces/${ComposerId}`).then((response) => {
        setListOfPieces(response.data);
      });
    },[]);

    // set session storage
    sessionStorage.setItem("composerName", composer.name);
    sessionStorage.setItem("composerId", composer.id);

    var composerName = sessionStorage.getItem("composerName");
  //window.name = composer.name;
  //window.composerId = composer.id;

  return (

   <div>
    <Container>

    <br></br>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/composers">Composers</Breadcrumb.Item>
      <Breadcrumb.Item active>{composerName}</Breadcrumb.Item>
    </Breadcrumb>
    <br></br>
    <Card style={{ }}>
      <Card.Body>
        <Card.Title>{composerName}</Card.Title>
        <Card.Text>
        <img
          src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${ComposerId}.JPG`}
          className='img-thumbnail' 
          alt={composerName}
          width="200"
      
        />
        <br></br>
        {composer.biography}
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <h4>Pieces</h4>
    <br></br>
    <Table striped hover size="sm">
      <thead>
        <tr>
          <th>Piece:</th>
        </tr>
      </thead>
      {listOfPieces.map((value) => {
        return (
        <tbody key={value.id}>
          <tr>
            <td onClick={() => {localStorage.setItem("linkToFiles", `/files/${value.id}`);
                                usenavigate(`/files/${value.id}`);
                               }
                        }>{value.title}</td>
          </tr>
        </tbody>
        
        );     
      
      })}
      </Table>

    </Container>
  </div>
  )
}


export default Pieces;