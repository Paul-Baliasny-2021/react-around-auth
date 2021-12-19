import { createFetchTemplate } from './api';
const BASE_URL = 'https://register.nomoreparties.co';

export const register = (email, password) => {
    return createFetchTemplate(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
};

export const authorize = (email, password) => {
    return createFetchTemplate(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
};

export const checkContent = (token) => {
    return createFetchTemplate(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
};