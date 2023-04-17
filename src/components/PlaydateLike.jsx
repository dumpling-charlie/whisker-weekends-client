import React, { useState } from 'react';
import axios from 'axios';

function PlaydateLike({ playdate }) {

    const userId = localStorage.getItem("authToken");
    const [likes, setLikes] = useState(playdate ? playdate.likes: 0);
    const [likedBy, setLikedBy] = useState(playdate ? playdate.likedBy: []);
    console.log(playdate);

    const handleLike = () => {
        axios
            .put(`http://localhost:5005/api/playdates/${playdate._id}/like`, {}, {
                headers: { Authorization: `Bearer ${userId}` },
              })
            .then((response) => {
                console.log("playdate has been liked!");
                setLikes(response.data.likes);
                setLikedBy(response.data.likedBy);
            })
            .catch((err) => console.log(err));
    }

    const hasLiked = likedBy.includes(userId);

    return(
        <div>
            <button onClick={handleLike} disabled={hasLiked}>
                {hasLiked ? 'Liked' : 'Like'} {likes}
            </button>
        </div>
    )
}

export default PlaydateLike;