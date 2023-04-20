import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function UserProfilePage() {
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    const storedToken = localStorage.getItem('authToken');

    const getUserDetails = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
            .then(response => {
                setUser(response.data);
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        getUserDetails();
    }, [userId])

    const renderUserDetails = () => {
        return (
            <div>
                <img src={user.imageUrl} alt="profile img"/>
                <h1>{user.name}</h1>
                <p>{user.location}</p>
                <p>{user.bio}</p>
            </div>
          )
    }

    return (
        <>
            {user ? renderUserDetails() : <h1>still loading</h1>}
        </>
    )
}

export default UserProfilePage;