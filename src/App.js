import {
    Link,
    Routes,
    Route
} from "react-router-dom";
import Login from "./routes/login";
import SignIn from "./routes/signin";
import InvalidPage from "./routes/invalidPage";
import Home from "./routes/home";
import "./App.css";
import { useState } from "react";
import axios from 'axios';

export default function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    axios.defaults.headers.common['Authorization'] = "Bearer " + (user ? user.jwt_token : "");

    const logOut = (event) => {
        event.preventDefault();
        axios.post('https://akademia108.pl/api/social-app/user/logout').then((res) => {
            console.log(res.data);
            setUser(null);
            localStorage.removeItem('user');
        })
    }

    return (
        <div className="header">
            <h1>Social App</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>{' '}
                    {!user && <li><Link to="/login"> Log In</Link></li>} {' '}
                    {!user && <li><Link to="/signin"> Sign In</Link></li>}
                    {user && <li><Link to="/" onClick={logOut}>Log out</Link></li>}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login setUserCB={setUser} />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="*" element={<InvalidPage />} />
            </Routes>
        </div>
    );
}