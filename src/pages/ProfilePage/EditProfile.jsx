import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context"

function EditProfile() {
  const { user } = useContext(AuthContext); // add isLoading, authenticateUser later

  const [updatedUser, setUpdatedUser] = useState({
    name: '',
    email: '',
    location: ''
  })

  const changeHandler = (target) => {
    setUpdatedUser((prevState)=>{
      return {...prevState, [target.name] : target.value}
    })
  }



  const submitForm = (event) => {
    event.preventDefault()
    
    .then((response) => {
      setUpdatedUser(response.data);
      console.log(response);
    })
    .catch((error) => console.log(error));
  }
  
  return (
    <div>
      <h2>Edit your account</h2>
      <form onSubmit={submitForm}>
        <label> Name:
          <input type="text" name="name" value={updatedUser.name} onChange={(event)=>{changeHandler(event.target)}}></input>
        </label>
        <label> Email:
          <input type="text" name="email" value={updatedUser.email} onChange={(event)=>{changeHandler(event.target)}}></input>
        </label>
        <label> Location:
          <input type="text" name="location" value={updatedUser.location } onChange={(event)=>{changeHandler(event.target)}}></input>
        </label>

        <button type="submit">Update Profile</button>
      </form>
      <button>Delete Profile</button>
    </div>
  );
}

export default EditProfile;
