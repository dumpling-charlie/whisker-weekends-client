import React, { useState, useContext } from 'react';
import axios from 'axios';
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { AuthContext } from '../context/auth.context';

function PlaydateLike({ playdate }) {

    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem("authToken");
    const [likes, setLikes] = useState(playdate ? playdate.likes: 0);
    const [likedBy, setLikedBy] = useState(playdate ? playdate.likedBy: []);
    const hasLiked = likedBy.includes(user._id);

    const handleLike = () => {

        if (hasLiked) {
            axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/playdates/${playdate._id}/like`, {}, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
            .then((response) => {
                setLikes(response.data.likes);
                setLikedBy(likedBy.filter(userId => userId !== user._id));
            })
            .catch((err) => console.log(err));
        } else {
            axios
            .put(`${process.env.REACT_APP_SERVER_URL}/api/playdates/${playdate._id}/like`, {}, {
                headers: { Authorization: `Bearer ${storedToken}` },
              })
            .then((response) => {
                setLikes(response.data.likes);
                setLikedBy([...likedBy, user._id]);
            })
            .catch((err) => console.log(err));
        }
        
    }

    return(
        <div>
            <button onClick={handleLike}>
                {hasLiked ? <BsHeartFill/> : <BsHeart/>} {likes}
            </button>
        </div>
    )
}

export default PlaydateLike;