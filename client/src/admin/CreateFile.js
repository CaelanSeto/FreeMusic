import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Upload from './Upload';

function CreateFile() {

    return (
        <div className="App">
         <Upload></Upload>
        </div>
      );
   
}


export default CreateFile;