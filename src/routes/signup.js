import React, { useState } from 'react';
import axios from 'axios';
import './css/SignUp.css';

export default function Signup() {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password1: '',
        password2: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target; // destrukturyzacja obiektu e.target na imię i wartość
        setForm(prevState => { // wykorzystanie poprzedniego stanu do jego modyfikacji
            return {    // zwrócenie obiektu
                ...prevState,
                [name]: value // wprowadzenie nowej wartości
            }
        });
    };

    const validate = () => {
        const errorsArr = [];
        if (!form.username || form.username.length < 4 || form.username.indexOf(' ') !== -1) {
            errorsArr.push('Invalid username.');
        }

        if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))) {
            errorsArr.push('Invalid e-mail address.');
        }

        if (!(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(form.password1)) || form.password1.length <6) {
            errorsArr.push('Invalid password, min 6 chars and 1 special char.');
        }

        if (form.password1 !== form.password2) {
            errorsArr.push("Passwords don't match.");
        }

        if (errorsArr.length !== 0) {
            setError(() => errorsArr);
            return false;
        } else {
            setError(null);
            return true;
        }

    }

    const submitForm = (e) => {
        e.preventDefault();

        if (validate()) { // jeśli validate() true
            setIsSubmitted(true);
            axios.post(
                'http://akademia108.pl/api/social-app/user/signup', { "username": form.username, "email": form.email, "password": form.password1 })
            .then((req) => {
                 // // your code :)      
                if (!req.data.signedup) {
                    const errorsArr = [];
                    errorsArr.push('Username already taken!');
                    setError(errorsArr);
                    setIsSubmitted(false);
                }
            }).catch((error) => {
                console.error(error);
            })
        } else {
            setIsSubmitted(false);
        }

    }


    return (
        <main className="SignUp">
            <h3>Please sign up:</h3>
            <form onSubmit={submitForm}>
                <label >username:<br /><input type="text" required name="username" value={form.username} onChange={handleChange} /></label><br />
                <label >e-mail:<br /><input type="email" required name="email" value={form.email} onChange={handleChange} /></label><br />
                <label >password:<br /><input type="password" required name="password1" value={form.password1} onChange={handleChange} /></label><br />
                <label >repeat password:<br /><input type="password" required name="password2" value={form.password2} onChange={handleChange} /></label><br /><br />
                <button type="submit">Submit</button>
                {isSubmitted && <h3>Registration completed.</h3>}
                {error && <ul>{error.map((error, i) => <li key={i}>{error}</li>)}</ul>}
            </form>
        </main>
    );
}