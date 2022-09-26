import React from "react";
import { useState, useEffect } from "react";

import axiosInst from "../helpers/AxiosInst";

import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

import SearchBar from '../searchbar/SearchBar';

function Home() {
  const [listOfPieces, setListOfPieces] = useState([]);

  useEffect(() => {
    axiosInst.get(`/pieces`).then((response) => {
      if (response.data) {
        setListOfPieces(response.data);
      }
    });
  }, []);

  return (
    <div>
      <Container>
      <div>
        <br></br>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
        </Breadcrumb>
        </div>
        <br></br>
        <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-secondary rounded-3">
            <h2>Welcome to Free Music!</h2>
            <br></br>
            <img 
              src="https://freeclassicmusic.s3.us-east-2.amazonaws.com/3.JPG"
              className='img-fuild img-thumbnail' 
              alt=""
            />
            <p><br></br>
              Free Music is a free open-source digital library containing <a href="https://en.wikipedia.org/wiki/Public_domain_music" style={{color: "white"}}>
              public-domain music scores</a>. 
              This project accepts any score of older musical editions out of copyright, and admits any scores by contemporary composers
              who wish to share their music with the world under a <a href="https://en.wikipedia.org/wiki/Creative_Commons" style={{color: "white"}}>Creative Commons license</a>.
              <br></br><br></br>
              This website also lets you play along with the
              sheet music thanks to a built-in MIDI plugin that detects if you have a MIDI device connected. 
              <br></br><br></br>
              To get started, click on the button below to browse through our list of Composers!
            </p>
            <Button variant="btn btn-outline-light" href="/composers">Browse our Composers</Button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-light border rounded-3 text-muted">
            <h3>Already know the name of your piece?</h3>
            <br></br>
            <p>You may use the search bar below to find your piece inside our database!<br></br>
            If your piece is missing, leave us an e-mail through our Contact Us page,
            and we will get back to you as soon as possible.</p>
            <br></br>
            <SearchBar placeholder="Enter Piece name..." data={listOfPieces}/>
            <br></br>
          </div>
        </div>
      </div>
      <br></br>
      

    </Container>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
      crossOrigin="anonymous"
    />
  </div>
  )
}

export default Home