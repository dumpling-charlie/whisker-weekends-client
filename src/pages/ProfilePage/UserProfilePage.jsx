import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function UserProfilePage() {
    const [user, setUser] = useState(null);
    const {userId} = useParams();
    const storedToken = localStorage.getItem('authToken');

    const getUserDetails = () => {
        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/profile/${userId}`, { Authorization: `Bearer ${storedToken}`})
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
                <h1>{user.name}</h1>
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