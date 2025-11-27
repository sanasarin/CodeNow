import React, {useState} from "react";
import axios from 'axios';
import useLogin from "../hooks/useLogin";

export const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [username, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const login = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Send a request to the backend
        axios.post('http://localhost:8000/account/register/', {
            "username": username,
            "password": pass,
            "email": email
        })
            .then(function (response) {
                console.log(response.data)
                login(username, pass, (error) => setErrorMessage(error.response.data['non_field_errors']))
            })
            .catch(function (error) {
                console.log(error.response.data)
                if (error.response.data['email'])
                    setErrorMessage(error.response.data['email'])
                else if (error.response.data['password'])
                    setErrorMessage(error.response.data['password'])
                else if (error.response.data['username'])
                    setErrorMessage(error.response.data['username'])
                else if (error.response.data['non_field_errors'])
                    setErrorMessage(error.response.data['non_field_errors'])
                else
                    setErrorMessage("Something went wrong")
            });
    }


    return (

        <div>
            <div className="container">

                <div className="auth-form-container mt-4">
                    <h1 className="fw-bold">Register</h1>

                    <form className="register-form" onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input value={username} onChange={(e) => setUserName(e.target.value)}
                                   type="name"
                                   name="name"
                                   id="name"
                                   className="form-control"
                                   placeholder="Enter your username here">
                            </input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)}
                                   type="email"
                                   placeholder="Enter your email here"
                                   id="email"
                                   className="form-control"
                                   name="email">
                            </input>
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>

                            <input value={pass} onChange={(e) => setPass(e.target.value)}
                                   type="password"
                                   placeholder="Enter your password here"
                                   className="form-control"
                                   id="password"
                                   name="password">
                            </input>
                        </div>

                        <p className={"text-danger mb-3"}>{errorMessage}</p>

                        <div className="mb-3">
                            <button className="btn btn-primary pe-4 ps-4" id="register-button">register</button>
                        </div>
                    </form>


                </div>

            </div>

        </div>

    )
}

export default Register; 