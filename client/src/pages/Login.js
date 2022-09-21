import React, { useState, useContext } from "react";
import axios from "axios";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../helpers/AuthContext"
import { useNavigate } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';




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
            if (response.data.error) {
                setBadCredentials(response.data.error);
            } else {
                console.log(data);
            }
        })
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthState } = useContext(AuthContext);

    let navigate = useNavigate()

    const login = () => {

        const data = { email: email, password: password };
        axios.post("http://localhost:3001/users/login", data).then((response) => {
            if (response.data.error) {
                setBadCredentials(response.data.error);
            } else {
                localStorage.setItem("accessToken", response.data.token);
                setAuthState({
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id,
                    role: response.data.role,
                    status: true,
                })
                if (response.data.role === "user") {
                    navigate("/");
                } else {
                    navigate("/admin");
                }

            }
        })
    };

    return (
        <div>
            <div className="row align-items-md-stretch">
                <div className="col-md-6">
                    <div className="h-100 p-5 text-white bg-secondary rounded-3">
                        <Formik initialValues={intialValues} onSubmit={onSubmit}
                            validationSchema={validationSchema}>
                            <Form>
                                <Form.Group className="mb-3" controlId="validationCustom01">
                                    <Form.Label>Name</Form.Label>
                                    <ErrorMessage name="name" component="span" />
                                    <Field
                                        autoComplete="off"
                                        id="inputCreatePost" name="name"
                                        placeholder="(Ex.John123...)"></Field>

                                </Form.Group>

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
                </div>
            </div>

            <div className="col-md-6">
                <div className="h-100 p-5 text-white bg-secondary rounded-3">
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
                    <p style={{ color: 'red' }}>{badCredentials}</p>
                    <div>
                        <button onClick={login}> Login </button>
                    </div>
                </div>
            </div>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossorigin="anonymous"
            />
        </div>
    );
}

export default Login;