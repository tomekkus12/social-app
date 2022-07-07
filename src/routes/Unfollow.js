import axios from 'axios';

export default function Unfollow(props) {

    const unfollowUser = (who) => {
        axios.post('https://akademia108.pl/api/social-app/follows/disfollow', { "leader_id": who })
        .then((res) => {
            console.log(res.data);
            props.refresh();
        })

        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })
    }

    return (
        <>
            {(JSON.parse(window.localStorage.getItem('user')).id != props.user.id) ? <button onClick={() => unfollowUser(props.user.id)} >Unfollow</button> : ''}
        </>
    )

}