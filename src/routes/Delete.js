import axios from 'axios';

export default function Delete(props) {

    const deletePost = () => {
        axios.post('https://akademia108.pl/api/social-app/post/delete', { "post_id": props.postID})
            .then((res) => {
                console.log(res.data);
                props.refresh();              
            })

            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    return (
        <div>
            {(JSON.parse(window.localStorage.getItem('user')).id === props.user.id) ? <button onClick={deletePost} >Delete</button> : ''}
        </div>
    )
}