import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {Bar} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";



function AdminStat() {
  
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    axios.get("http://18.217.161.38:3001/downloads/statistics", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      }
    }).then((response) =>{
      setDownloads(response.data);
    });
  }, []);

  const data = {
    labels: downloads.map((val) => {return val.date}),
    datasets: [{
      label: "downloads",
      data: downloads.map((val) => {return val.total}),
      backgroundColor: ["lightblue"],
      borderColor: "grey",
      borderWidth: 1,
    }]
  };
  
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
