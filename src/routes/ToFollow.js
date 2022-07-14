import React, { useState, useEffect } from "react";
import axios from 'axios';
import './css/ToFollow.css';

export default function ToFollow(props) {

    const [toFollow, setToFollow] = useState([]);

    const getData = () => {
        axios.post(`https://akademia108.pl/api/social-app/follows/recommendations`)
            .then(res => {
                setToFollow(res.data);
            })
            .catch((error) => console.log(error));
    }

    const followFunc = who => {
        axios.post('https://akademia108.pl/api/social-app/follows/follow', { "leader_id": who })
        .then((res) => {
            console.log(who);
            getData();
        })

        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    }


    useEffect(() => {
        getData();        
    }, []);

    return (
        <div className="ToFollow">
            <h5>Recommended profiles:</h5>
            {toFollow.map(toFollowItem => {
                return <div key={toFollowItem.id}><img src={toFollowItem.avatar_url} alt="user avatar" />
                 {toFollowItem.username} mail: {toFollowItem.email}
                {' '}<button onClick={() => followFunc(toFollowItem.id)}>Follow</button></div>
            })}
        </div>
    )
}
