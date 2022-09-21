import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';


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
      </Breadcrumb>
      <br></br>
      <div className="composerPiecesFiles">
        <div className="AppComposers"><br></br>
          <h2>Composers</h2><br></br>
          {listOfComposers.map((value) => {
            return (
                <div className='composers'>        
                    <button  onClick={() => {usenavigate(`/pieces/${value.id}`)}}>
                        <div>
                            {value.name}
                        </div>
                    </button>    
                </div>
            );     
          })}
        </div>
      </div>
      </Container>
    </div>
  )
}


export default Composers;