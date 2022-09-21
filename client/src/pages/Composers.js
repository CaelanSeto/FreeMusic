import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


function Composers() {
   const [listOfComposers, setListOfComposers] = useState([]);
   const usenavigate = useNavigate();

  useEffect(() => {  
    axios.get("http://localhost:3001/composers").then((response) => {
        setListOfComposers(response.data);   
    });
  }, []);
  
  return (
    <div className="container">
      <Container>
      <br></br>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Composers</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Composers</h4>
      <br></br>
      <Table striped bordered hover size="sm">
      <tr>
        <th>ID#</th>
        <th>Composer:</th>
      </tr>
      {listOfComposers.map((value) => {
        return (
        <tbody>
          <tr>
            <td>{value.id}</td>
            <td><Button variant="outline-secondary" onClick={() => {usenavigate(`/pieces/${value.id}`)}}>{value.name}</Button></td>
          </tr>
        </tbody>
        
        );     
      
      })}
      </Table>
      </Container>
    </div>
  )
}


export default Composers;