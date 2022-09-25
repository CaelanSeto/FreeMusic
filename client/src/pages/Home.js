import React from "react";

import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

function Home() {
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
            <p><br></br>Free Music is a free open-source digital library containing public-domain music scores. 
            This project accepts any score of older musical editions out of copyright, and admits any scores by contemporary composers
            who wish to share their music with the world under a Creative Commons license. <br></br><br></br>This website also lets you play along with the
            sheet music thanks to a built-in MIDI plugin that detects if you have a MIDI device connected. <br></br><br></br>
            To get started, click on the button below to browse through our list of Composers!

            </p>
            <Button variant="btn btn-outline-light" href="/composers">Browse our Composers</Button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 text-white bg-secondary border rounded-3">
            <h2>Placeholder (Searchbar?)</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ultrices tortor, vitae suscipit risus interdum a. Phasellus id felis felis. 
              Sed risus ligula, interdum sed nunc id, aliquet ullamcorper dolor. Praesent ex risus, lobortis at volutpat at, dictum et diam. 
              Praesent luctus urna lacus, ut efficitur sem ultrices vitae. In eget mattis eros. Ut congue, odio id dapibus aliquam, elit eros pharetra erat, 
              id maximus quam nunc vel ante. In bibendum tortor nisl, vel vehicula erat malesuada non. Fusce neque est, efficitur et diam sed, dictum gravida enim.</p>
            <Button variant="btn btn-dark" href="/">Placeholder</Button>
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