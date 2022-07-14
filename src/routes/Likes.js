import React, { useState } from "react";
import axios from 'axios';

export default function Likes(props) {

    const checkFunc = () => {

        if (localStorage.getItem('user')) {
            for (let i = 0; i < (props.likeTable).length; i++) {
                if (JSON.parse(window.localStorage.getItem('user')).id === props.likeTable[i].id) {
                    return 'unlike';
                }
            }
            return 'like';
        }
    }

    const [likeStatus, setLikeStatus] = useState(checkFunc);

    const changeLikeStatus = () => {
        if (likeStatus === 'like') {
            setLikeStatus('unlike');
            axios.post('https://akademia108.pl/api/social-app/post/like', { "post_id": props.postID })
                .then((res) => {
                })

                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        } else {
            setLikeStatus('like');
            axios.post('https://akademia108.pl/api/social-app/post/dislike', { "post_id": props.postID })
                .then((res) => {
                })

                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        }
        props.refresh();
    }


    if (window.localStorage.getItem('user')) {

        return (
            <div>
                {(likeStatus === 'unlike') ? 'I like it!': ''} <input type="button" value={likeStatus} onClick={changeLikeStatus} />
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }

}