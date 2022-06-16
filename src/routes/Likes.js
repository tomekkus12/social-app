import React from "react";
import axios from 'axios';

export default function Likes(props) {

    let liked = false;

    if (window.localStorage.getItem('user')) {

        for (let i = 0; i < (props.likeTable).length; i++) {
            if (JSON.parse(window.localStorage.getItem('user')).id === props.likeTable[i].id) {
                liked = true;
            }
        }
        if (liked) {
            return (
                <button>Unlike</button>
            );
        } else {
            return (
                <button>Like</button>
            );
        }
    } else {
        return <div></div>;
    }


}