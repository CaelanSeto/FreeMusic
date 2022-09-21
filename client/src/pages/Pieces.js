import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

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
   <div className="composerPiecesFiles">
    <div className="AppComposers"><br></br>
      <h2>{composer.name}</h2>   
        <div className="biograpphy"> 
            <img src={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${ComposerId}.JPG`} alt={composer.name} />
            <br></br>   
            <button id='pieces'>
                    {composer.biography}
            </button>
        </div>
            
      <br></br><br></br>
      
      <h3>Composer Pieces</h3>
      {listOfPieces.map((value) => {
        return (
            <div className='composers'>        
                <button  onClick={() => {usenavigate(`/files/${value.id}`)}}>
                    <div>
                        {value.title}
                    </div>
                </button>    
            </div>
        );     
      })}

    </div>
  </div>
  )
}


export default Pieces;