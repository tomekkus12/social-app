import React, { useState } from "react";
import axios from 'axios';
import './css/AddPost.css';

export default function AddPost(props) {

    const [postData, setPostData] = useState('Write a message ...');

    const sendPost = (event) => {
        event.preventDefault();
        axios.post('https://akademia108.pl/api/social-app/post/add', { "content": postData})
            .then((res) => {
                console.log(res.data);
                props.whenAdded();
            })

            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }

    return (
        <form onSubmit={sendPost} className="AddPost">
            <textarea name="postData" value={postData} onChange={e => setPostData(e.target.value)} rows="5" cols="71" ></textarea><br />
            <button type="submit">Send Post</button>
        </form>
    );
}