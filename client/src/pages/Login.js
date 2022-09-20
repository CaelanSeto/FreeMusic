import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext"
import {useNavigate} from "react-router-dom";



function Login() {


    const [badCredentials, setBadCredentials] = useState("");
    const intialValues = {
        name: "",
        email: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3).max(15).required(),
        email: Yup.string().min(5).max(30).required(),
        password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/users/register", data).then((response) => {
            if(response.data.error) {
                setBadCredentials(response.data.error);
              }else{
            console.log(data);
              }
        })
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    let navigate = useNavigate()

    const login = () => {
        
        const data = { email: email, password: password };
        axios.post("http://localhost:3001/users/login", data).then((response) => {
            if(response.data.error) {
                setBadCredentials(response.data.error);
              }else{
              localStorage.setItem("accessToken", response.data.token);
              setAuthState({
                name: response.data.name,
                email: response.data.email,
                id: response.data.id,
                role: response.data.role,
                status: true,
              })
              if (response.data.role === "user"){
                navigate("/");
              }else{
                navigate("/admin");
              }
              
              }
            })
          };

    return (
            <div className="loginPage">
                <div className="leftSide">
                    <Formik initialValues={intialValues} onSubmit={onSubmit}
                        validationSchema={validationSchema}>
                        <Form className="formContainer">

                            <label>Name</label>
                            <ErrorMessage name="name" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost" name="name"
                                placeholder="(Ex.John123...)"></Field>

                            <label>Email</label>
                            <ErrorMessage name="email" component="span" />
                            <Field
                                autoComplete="off"
                                id="inputCreatePost" name="email"
                                placeholder="(Ex.John@gmail...)"></Field>

                            <label>Password</label>
                            <ErrorMessage name="password" component="span" />
                            <Field
                                autoComplete="off" type="password"
                                id="inputCreatePost" name="password"
                                placeholder="(Your Password)"></Field>

                            <button type="submit">Register</button>
                        </Form>
                    </Formik>
                </div>

            <div className="loginContainer">
                <div className="rightside">
                    <label>Email:</label>
                    <div>
                    <input
                        type="text"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                    />
                    </div>
                    <label>Password:</label>
                    <div>
                    <input
                        type="password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                    </div>
                    <p style={{color: 'red'}}>{badCredentials}</p>
                    <div>
                    <button onClick={login}> Login </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;