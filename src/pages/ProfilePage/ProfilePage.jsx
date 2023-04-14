import React, { useContext } from 'react';
import { AuthContext } from "../../context/auth.context"
import { Link } from 'react-router-dom';

function ProfilePage() {
  const { user } = useContext(AuthContext);
  
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>ID: {user._id}</p>

      <Link to={"/profile/edit"}>
        <h4>Edit profile</h4>
      </Link>

      <Link to="/pets">
            <button>My Pets</button>
      </Link>

    </div>
  );
}

export default ProfilePage;