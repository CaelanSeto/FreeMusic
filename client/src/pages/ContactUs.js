import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_2idpa5p', 'template_uq4laid', form.current, 'POf9JtCASON39SubQ')
      .then((result) => {
          setSuccess(result.text);
      }, (error) => {
          setErrorMessage(error.text);
      });
  };

  return (
    <div className="container">
      <br></br><br></br><br></br>
      <h3>Contact Us</h3><br></br><br></br><br></br>
      <form ref={form} onSubmit={sendEmail}>
      <div className="form-group">
       <label>Name</label>
        <input type="text" name="user_name" className="form-control" />
      </div><br></br>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="user_email" className="form-control"/>
      </div><br></br>
      <div className="form-group">
        <label>Message</label>
        <textarea name="message" className="form-control"/>
      </div><br></br><br></br>
      <p style={{color: 'red'}}>{errorMessage}</p>
      <p style={{color: 'green'}}>{success}</p>
      <br></br>
      
      <input type="submit" className="btn btn-dark" value="Send" />
      </form>
    </div>
  );
};