import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/home.css';
import AddPost from './AddPost';
import Likes from './Likes';

const dateTime = (dateInString) => {
    if (dateInString == null) {
        return "never";
    } else {
        let formattedDate = new Date(Date.parse(dateInString));
        let day = formattedDate.getDate();
        let month = formattedDate.getMonth() + 1;
        let year = formattedDate.getFullYear();
        return day + "-" + month + "-" + year;
    }
}


export default function Home() {

    const [posts, setPosts] = useState([]);

    const getData = () => {
        axios.post(`https://akademia108.pl/api/social-app/post/latest`)
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch((error) => console.log(error));
    }

    const showMore = () => {
        axios.post('https://akademia108.pl/api/social-app/post/older-then', { "date": posts[posts.length - 1].created_at })
            .then((res) => {
                setPosts(posts.concat(res.data));
            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })

    }

    const newerThan = () => {
        const newestPost = posts[0].created_at;
        axios.post(`https://akademia108.pl/api/social-app/post/newer-then`, { "date": newestPost })
            .then(res => {
                setPosts((res.data).concat(posts));
            })
            .catch((error) => console.log(error));
    }


    useEffect(() => {
        getData();
        const interval = setInterval(() => {
            getData();
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main className="wrapper">
            {localStorage.getItem('user') ? <AddPost whenAdded={newerThan} /> : ''}
            {posts.map(post => {
                return (
                    <div className="container">
                        <div><img src={post.user.avatar_url} width="50" alt="user avatar"></img>{post.user.username + " id:" + post.id + " likes:" + post.likes.length}</div>
                        <div>created:{dateTime(post.created_at)} edited:{dateTime(post.updated_at)}</div>
                        <div>{post.content}</div>
                        <Likes likeTable={post.likes} />

                    </div>
                )
            })}
            <button onClick={showMore}>More</button>
        </main>
    )
}