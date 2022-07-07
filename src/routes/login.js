import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/login.css';

export default function Login(props) {

    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');

    let navigate = useNavigate();

    const tryToLogIn = (event) => {
        axios.post('https://akademia108.pl/api/social-app/user/login', { "username": login, "password": pass, "ttl": 3600 })
            .then((res) => {
                console.log(res.data);
                if (res.data.username) {
                    props.setUserCB(res.data);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    navigate('/');
                } else {
                    window.alert('Błedny login/hasło');
                }
            })

            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
        event.preventDefault();

    }


    return (
        <main className='login'>
            <h2>Please Log in:</h2>
            <form onSubmit={tryToLogIn}>
                <label>login:<br /><input type="text" name="login" value={login} onChange={e => setLogin(e.target.value)} /></label><br />
                <label>password:<br /><input type="password" name="password" value={pass} onChange={e => setPass(e.target.value)} /></label><br /><br />
                <button type="submit">Submit</button>
            </form>
        </main>
    );
}