import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";



function AdminStat() {
  
  const [downloads, setDownloads] = useState([]);
  
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  useEffect(() => {
    axios.get("http://localhost:3001/downloads/statistics").then((response) =>{
      setDownloads(response.data);
    });
  }, []);

  //const downloads = [{"createdAt":"2022-09-17T00:00:00.000Z","total":4},{"createdAt":"2022-09-18T10:10:00.000Z","total":11},{"createdAt":"2022-09-19T10:10:00.000Z","total":5},{"createdAt":"2022-09-20T10:10:00.000Z","total":9},{"createdAt":"2022-09-24T10:10:00.000Z","total":2}];

  const [data, setData] = useState({
    labels: downloads.map((val) => formatDate(val.createdAt)),
    datasets: [{
      label: "downloads",
      data: downloads.map((val) => val.total),
      backgroundColor: ["lightblue"],
      borderColor: "grey",
      borderWidth: 1,
    }]
  });

  return (
    <div className="container">
        <br></br>
      <h3>Files activity:</h3>
      <br></br>
      <div style={{width: "90%"}}>
        <Bar data={data}/>
      </div>
    </div>
  );
}
export default AdminStat;
