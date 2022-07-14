import axios from 'axios';

export default function Delete(props) {

    const deletePost = () => {

        if (window.confirm("Are you sure?") === true) {

            axios.post('https://akademia108.pl/api/social-app/post/delete', { "post_id": props.postID })
                .then((res) => {
                    props.refresh();
                })

                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })
        } else {
            
        }

    }

    return (
        <div>
            {(JSON.parse(window.localStorage.getItem('user')).id === props.user.id) ? <button onClick={deletePost} >Delete</button> : ''}
        </div>
    )
}