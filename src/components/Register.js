import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

export default function Register(props) {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetRegistrationForm = () => {
        setEmail('');
        setPassword('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.register(email, password)
            .then((res) => {
                if (!res || res.statusCode === 400) {
                    throw new Error('Oops, something went wrong! Please try again.')
                }
            })
            .then(() => {
                props.onSuccess();
                resetRegistrationForm();
                history.push('/login');
            })
            .catch((err) => {
                props.handleError()
            });
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history.push('/')
        }
    }, [history]);

    return (
        <div className='register'>
            <h2 className="register__title">Sign up</h2>
            <form className='register__form' onSubmit={handleSubmit}>
                <input
                    required
                    className='register__input'
                    name='email'
                    value={email}
                    type='email'
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email" />

                <input
                    required
                    className='register__input'
                    name='password'
                    value={password}
                    type='password'
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button type='submit' className='register__submit'>
                    Sign up
                </button>
            </form>
            <p className='register__signin'>Already a member?
                <Link to='login' className='register__login-link'>  Log in here!</Link>
            </p>
        </div>
    )
}