import "./ProfilePage.css";
import React, { useState, useEffect } from "react";
import axios from "axios";


function ProfilePage() {
  const [user, setUser] = useState(null);


  const getUser = () => {

    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/profile/my-account`, { headers: { Authorization: `Bearer ${storedToken}` }})
      .then ((response) => {
        console.log(response.data)
      })
  }

  useEffect(() => {
    console.log("getting user data....")
    getUser();
  })

  


  

 /* useEffect(() => {
    async function fetchUserData() {
      const response = await fetch("/api/user");
      const data = await response.json();
      setUser(data);
    }
    fetchUserData();
  }, []); */
  return (
    <div>
      <h1>Profile of </h1>
    </div>
  )
}

export default ProfilePage;
