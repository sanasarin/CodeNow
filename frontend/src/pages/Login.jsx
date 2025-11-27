import {useState} from "react";
import axios from 'axios';
import useLogin from "../hooks/useLogin";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.headers.common['Authorization'] = undefined

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const login = useLogin()

    const validateUsername = (username) => {
        if (username.trim() === '') {
            return 'Username is required';
        }
        return '';
    };

    const validatePassword = (password) => {
        if (password.trim() === '') {
            return 'Password is required';
        }
        return '';
    };


    const loginHandler = (event) => {
        event.preventDefault();
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        setUsernameError(usernameError);
        setPasswordError(passwordError);

        if (usernameError || passwordError) {
          return; // exit the function if there are errors
        }

        login(
          username,
          password,
          (error) => setErrorMessage(error.response.data['non_field_errors'])
        );
      };

    return (
        <div>
            <div className="container mt-4">
                <div className="auth-form-container">
                    <h1 className="fw-bold">Log in</h1>

                    <form className="login-form" onSubmit={loginHandler}>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="username">Username</label>

                            <input className="form-control" value={username}
                                   onChange={
                                            (e) => { setUsername(e.target.value)
                                            setUsernameError(validateUsername(e.target.value))
                                        }}
                                   type="text"
                                   placeholder="Enter your username here"
                                   id="email"
                                   name="email">
                            </input>
                            {usernameError && <p className="text-danger">{usernameError}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input className="form-control" value={password}
                                   onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(validatePassword(e.target.value));
                                   }}
                                   type="password"
                                   placeholder="Enter your password here"
                                   id="password"
                                   name="password">
                            </input>
                            {passwordError && <p className="text-danger">{passwordError}</p>}
                        </div>

                        <p className="text-danger mb-3">{errorMessage}</p>

                        <div className="mb-3">
                            <button
                                className="btn btn-primary pe-4 ps-4"
                                id="login-button"
                                type="submit">
                                Log in
                            </button>
                        </div>

                    </form>

                </div>
            </div>

        </div>

    )
}