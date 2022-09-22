import React from 'react';
import Upload from './Upload';

function UploadFiles() {

    return (
        <div>
          <br></br> <br></br> <br></br><br></br>
          <h2>Upload File to AWS:</h2>
                <br></br><br></br>
            <div className="container">
                <Upload></Upload>
            </div>
        </div>
      );
   
}


export default UploadFiles;