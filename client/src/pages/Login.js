import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext"
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



function Login() {


    const [badCredentials, setBadCredentials] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
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
        axios.post("http://18.217.161.38:3001/users/register", data).then((response) => {
            if (response.data.error) {
                setError(response.data.error);

            } 
            else {
                setSuccess("Congratulations, you are registered!")
            }
        })
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let navigate = useNavigate()

    const login = () => {

        const data = { email: email, password: password };
        axios.post("http://18.217.161.38:3001/users/login", data).then((response) => {
            if (response.data.error) {
                setBadCredentials(response.data.error);
            } 
            else {
                localStorage.setItem("accessToken", response.data.token);
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("status", true);
                setAuthState({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    role: response.data.role,
                    status: true,
                })
                if (response.data.role === "user") {
                    if(localStorage.getItem("linkToFiles")){
                        navigate(localStorage.getItem("linkToFiles"));
                    }
                    else{
                        navigate("/");
                    }
                } 
                else {
                    localStorage.setItem("role", response.data.role);
                    navigate("/admin");
                }

            }
        })
    };

    return (
        <div>
            <br></br>
            <Container>
                <div className="row align-items-md-stretch">
                    <div className="col-md-6">
                        <div className="h-100 p-5 text-white bg-secondary rounded-3">
                            <h4>Registration</h4>
                            <br></br>
                            <Formik initialValues={intialValues} onSubmit={onSubmit}
                                validationSchema={validationSchema}>
                                <Form className="formContainer">

                                    <label>Name:</label>
                                    <br></br>
                                    <ErrorMessage name="name" component="span" />
                                    <br></br>
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost" name="name"
                                        placeholder="(Ex.John123...)"
                                        onClick={() => {
                                            setError("");
                                            setSuccess("");
                                        }}
                                    >
                                        
                                    </Field>
                                    <br></br><br></br>
                                    <label>Email:</label>
                                    <br></br>
                                    <ErrorMessage name="email" component="span" />
                                    <br></br>
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost2" name="email"
                                        placeholder="(Ex.John@gmail...)"
                                        onClick={() => {
                                            setError("");
                                            setSuccess("");
                                        }}
                                    >
                                    </Field>
                                    <br></br><br></br>
                                    <label>Password:</label>
                                    <br></br>
                                    <ErrorMessage name="password" component="span" />
                                    <br></br>
                                    <Field
                                        autoComplete="off" type="password"
                                        name="password"
                                        placeholder="(Your Password)"
                                        onClick={() => {
                                            setError("");
                                            setSuccess("");
                                        }}
                                    ></Field>
                                    <br></br><br></br>
                                    <p style={{color: 'red'}}>{error}</p>
                                    <p style={{color: '#a5d6a7'}}>{success}</p>
                                    <br></br>
                                    <Button variant="dark" size="sm" type="submit">Register</Button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="h-100 p-5 text-white bg-dark rounded-3">
                            <h4>Login</h4>
                            <br></br>
                            <label>Email:</label>
                            <br></br><br></br>
                            <div>
                                <input
                                    type="text"
                                    onChange={(event) => {
                                        setBadCredentials("");
                                        setEmail(event.target.value);
                                    }}
                                />
                            </div>
                            <br></br>
                            <label>Password:</label>
                            <br></br><br></br>
                            <div>
                                <input
                                    type="password"
                                    onChange={(event) => {
                                        setBadCredentials("");
                                        setPassword(event.target.value);
                                    }}
                                />
                            </div>
                            <br></br>
                            <div>
                                <Button variant="secondary" size="sm" onClick={login}> Login </Button>
                            </div>
                            <br></br>
                            <span>{badCredentials}</span>
                        </div>
                    </div>
                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                        integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                        crossOrigin="anonymous"
                    />
                </div>
            </Container>
        </div>
    );
}

export default Login;