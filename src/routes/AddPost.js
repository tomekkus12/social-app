import React, { useState } from "react";
import axios from 'axios';

export default function AddPost(props) {

    const [postData, setPostData] = useState('Wpisz posta ...');

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
        <form onSubmit={sendPost}>
            <textarea name="postData" value={postData} onChange={e => setPostData(e.target.value)} ></textarea><br />
            <button type="submit">Send Post</button>
        </form>
    );
}