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
  https://freeclassicmusic.s3.us-east-2.amazonaws.com/lacrymosa.mp3
*/

  return (
    <div className="composerPiecesFiles">
    <div className="AppComposers"><br></br>
      <h2>{window.name} / Files</h2><br></br>
      {listOfFiles.map((value) => {
        return (
            <div className='composers'>   
                <h3>{value.instruments}</h3>     
                <a  href={`https://freeclassicmusic.s3.us-east-2.amazonaws.com/${value.file}`} target="_blank">
                    <div>
                        {value.file}
                    </div>
                </a>    
            </div>
        );     
      })}

    </div>
    </div>
  )
}


export default Files;