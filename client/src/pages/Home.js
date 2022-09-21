import React from "react";

import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';

import MIDIAccess from "../MIDI/MIDIAccess";

<MIDIAccess />

//IMAGE NEEDS TO BE FIXED

function Home() {
  return (
    <div>
      <Container>
      <div>
        <br></br>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        </Breadcrumb>
        </div>
        <br></br>
        <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-secondary rounded-3">
            <h2>Composers</h2>
            <br></br>
            <img 
              src="https://freeclassicmusic.s3.us-east-2.amazonaws.com/3.JPG"
              className='img-fuild img-thumbnail' 
              alt=""
            />
            <p><br></br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ultrices tortor, vitae suscipit risus interdum a. Phasellus id felis felis. 
              Sed risus ligula, interdum sed nunc id, aliquet ullamcorper dolor. Praesent ex risus, lobortis at volutpat at, dictum et diam. 
              Praesent luctus urna lacus, ut efficitur sem ultrices vitae. In eget mattis eros. Ut congue, odio id dapibus aliquam, elit eros pharetra erat, 
              id maximus quam nunc vel ante. In bibendum tortor nisl, vel vehicula erat malesuada non. Fusce neque est, efficitur et diam sed, dictum gravida enim.</p>
            <Button variant="btn btn-outline-light" href="/composers">Browse our Composers</Button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 text-white bg-secondary border rounded-3">
            <h2>Placeholder (Searchbar?)</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ultricies ultrices tortor, vitae suscipit risus interdum a. Phasellus id felis felis. 
              Sed risus ligula, interdum sed nunc id, aliquet ullamcorper dolor. Praesent ex risus, lobortis at volutpat at, dictum et diam. 
              Praesent luctus urna lacus, ut efficitur sem ultrices vitae. In eget mattis eros. Ut congue, odio id dapibus aliquam, elit eros pharetra erat, 
              id maximus quam nunc vel ante. In bibendum tortor nisl, vel vehicula erat malesuada non. Fusce neque est, efficitur et diam sed, dictum gravida enim.</p>
            <Button variant="btn btn-outline-light" href="/">Placeholder</Button>
          </div>
        </div>
      </div>
      <br></br>
      <div> <Button className="btn btn-dark" id="MIDIbutton">Start MIDI plugin</Button></div>
      <br></br>

      

    </Container>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
      integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
      crossorigin="anonymous"
    />
  </div>
  )
}

export default Home