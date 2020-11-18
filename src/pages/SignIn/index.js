import SignIn from '../../components/SignIn';
import React, { useState } from 'react';
import APICall from '../../configs/APICall';
import { Redirect } from "react-router-dom";

export default function SignInPage() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        APICall('auth/login', 'POST', {
            email: user.email,
            password: user.password
        }).then(res => {
            localStorage.setItem('accessToken', JSON.stringify(res.data.access_token));
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setIsLogin(true);
            setIsError(false);
        }).catch(err => {
            console.log(err);
            setIsLogin(false);
            setIsError(true);
        })
    };
    const handleChange = (event) => {
        if (event.target.name === 'email') {
            setUser({
                email: event.target.value,
                password: user.password
            })
        } else if (event.target.name === 'password') {
            setUser({
                email: user.email,
                password: event.target.value
            })
        }
    };
    if (isLogin)
        return <Redirect to={`${process.env.PUBLIC_URL}/`}></Redirect>;
    else
        return <SignIn handleSubmit={handleSubmit} user={user} handleChange={handleChange} isError = {isError}/>;
}