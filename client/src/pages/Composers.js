import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';


function Composers() {
   const [listOfComposers, setListOfComposers] = useState([]);
   const usenavigate = useNavigate();

  useEffect(() => {  
    axios.get("http://18.217.161.38:3001/composers").then((response) => {
        setListOfComposers(response.data);   
    });
  }, []);
  
  return (
    <div>
      <Container>
      <br></br>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Composers</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Composers</h4>
      <br></br>
      <Table striped bordered hover size="sm">
      {listOfComposers.map((value) => {
        return (
        <tbody key={value.id}>
          <tr>
            <td onClick={() => {usenavigate(`/pieces/${value.id}`)}}>{value.name}</td>
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