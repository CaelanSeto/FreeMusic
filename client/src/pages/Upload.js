import React , {useState} from 'react';
import S3 from 'react-aws-s3';

// npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;

const Upload = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [select, setSelect] = useState("");

    // the configuration information is fetched from the .env file
    const config = {
        bucketName: process.env.REACT_APP_BUCKET_NAME,
        region: process.env.REACT_APP_REGION,
        accessKeyId: process.env.REACT_APP_ACCESS,
        secretAccessKey: process.env.REACT_APP_SECRET,
    }

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const resetFile = () => {
        setSelectedFile(null);
        setSelect("");
        window.location.reload(true);
    }

    const uploadFile = async (file) => {
        const ReactS3Client = new S3(config);
        // the name of the file uploaded is used to upload it to S3
        ReactS3Client
        .uploadFile(file, file.name)
        .then(data => console.log(data.location))
        .catch(err => console.error(err));
        setSelect("File uploaded!");
    }
    return (
        <div>
                <input className="btn btn-secondary" type="file" onChange={handleFileInput}/>
                <br></br><br></br><br></br>
                <button className="btn btn-secondary" onClick={() => resetFile()}> Reset</button>
                &nbsp;&nbsp;
                <button className="btn btn-dark" onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
                <br></br><br></br>
                <h5 style={{color: 'green'}}>{select}</h5>
        </div>
    );
}

export default Upload;