import React, { useContext } from 'react';
import { AuthContext } from "../../context/auth.context"

function ProfilePage(props) {
  const { user } = useContext(AuthContext);
  
  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* <p>ID: {user._id}</p> */}
    </div>
  );
}

export default ProfilePage;