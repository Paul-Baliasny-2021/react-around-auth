import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import * as auth from '../utils/auth';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const resetLoginForm = () => {
        setEmail('');
        setPassword('');
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/')
        }
    }, [history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.authorize(email, password)
            .then((res) => {
                if (!res || res.statusCode === 401) {
                    throw new Error('Authorization failed!')
                }
                if (res && res.token) {
                    history.push('/');
                    localStorage.setItem('token', res.token);
                    resetLoginForm();
                    props.onSuccess();
                    props.handleLogin();
                    props.checkToken();
                }
            })
            .catch((err) => {
                props.handleError();
            });
    };

    return (
        <div className="login register">
            <h2 className="login__title register__title">Log in</h2>
            <form onSubmit={handleSubmit} className="login__form register__form">
                <input id="email" required name="email"
                    className='register__input'
                    type="email" value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input id="password" required name="password"
                    className='register__input'
                    type="password" value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit" className="login__link register__submit">
                    Log in
                </button>
            </form>

            <p className='register__signin'>Not a member yet?
                <Link to="/register" className="login__register-link register__login-link">  Sign up here!</Link>
            </p>

        </div>
    );
}

export default Login;