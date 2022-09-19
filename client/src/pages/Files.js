import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';


function Files() {
   const [listOfFiles, setListOfFiles] = useState([]);
   //const [piece, setPiece] = useState([]);
   //const [composer, setComposer] = useState([]);
   const usenavigate = useNavigate();

   let { PieceId } = useParams();

  useEffect(() => {  
    axios.get(`http://localhost:3001/files/${PieceId}`).then((response) => {
        setListOfFiles(response.data);   
    });
  }, []);
/*
  useEffect(() => {  
    axios.get(`http://localhost:3001/pieces/byId/${PieceId}`).then((response) => {
        setPiece(response.data);   
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/composers/byId/${piece.ComposerId}`).then((response) => {
        setComposer(response.data);   
    });
  }, []);
*/
  return (
    <div className="composerPiecesFiles">
    <div className="AppComposers"><br></br>
      <h2>{window.name} / Files</h2><br></br>
      {listOfFiles.map((value) => {
        return (
            <div className='composers'>   
                <h3>{value.instruments}</h3>     
                <button  onClick={() => {usenavigate(`${value.file}`)}}>
                    <div>
                        {value.file}
                    </div>
                </button>    
            </div>
        );     
      })}

    </div>
    </div>
  )
}


export default Files;