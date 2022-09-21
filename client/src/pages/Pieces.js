import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

function Pieces() {
   const [listOfPieces, setListOfPieces] = useState([]);
   const [composer, setComposer] = useState([]);
   const usenavigate = useNavigate();

   let { ComposerId } = useParams();

  useEffect(() => {  
    axios.get(`http://localhost:3001/composers/byId/${ComposerId}`).then((response) => {
        setComposer(response.data);   
    });
    axios.get(`http://localhost:3001/pieces/${ComposerId}`).then((response) => {
        setListOfPieces(response.data);   
    });
  },[]);
  window.name = composer.name;
  return (

   <div>
    <Container>

    <br></br>
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/composers">Composers</Breadcrumb.Item>
      <Breadcrumb.Item active>{composer.name}</Breadcrumb.Item>
    </Breadcrumb>
    <br></br>
    <Card>
      <Card.Body>
        <Card.Title>{composer.name}</Card.Title>
        <Card.Text>
        <img
          src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${ComposerId}.JPG`}
          className='img-thumbnail' 
          alt={composer.name}
        />
        <br></br>
        {composer.biography}
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <h4>Pieces</h4>
    <br></br>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Piece:</th>
          <th></th>
        </tr>
      </thead>
      {listOfPieces.map((value) => {
        return (
        <tbody>
          <tr>
            <td>{value.id}</td>
            <td>{value.title}</td>
            <td><Button  onClick={() => {usenavigate(`/files/${value.id}`)}}></Button></td>
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