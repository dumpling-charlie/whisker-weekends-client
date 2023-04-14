import {  useState } from "react";
import playdateServices from "../../services/playdate.service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth.service";
function CreatePlaydatePage() {

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");

 const navigate = useNavigate();
 const storedToken = localStorage.getItem("authToken");
 // ******** this method handles the file upload ********
 const handleFileUpload = (e) => {
  e.preventDefault()
  console.log("wtf")
   // console.log("The file to be uploaded is: ", e.target.files[0]);

   const uploadData = new FormData();


   uploadData.append("imageUrl", e.target.files[0]);

  //  playdateServices
  //    .uploadImage(uploadData)
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/pets/upload`, uploadData, {headers: { Authorization: `Bearer ${storedToken}` }})
   
    .then((response) => {
      console.log("response is: ", response);
      // response carries "fileUrl" which we can use to update the state
      setImageUrl(response.imageUrl);
    })
    .catch((err) => console.log("Error while uploading the file: ", err));
 };

 // ********  this method submits the form ********
 const handleSubmit = (e) => {
   e.preventDefault();

   playdateServices
     .createPlaydate({ title, location, date, time, description, imageUrl })
     .then((res) => {
       // navigate to another page
       navigate("/api/playdates");
     })
     .catch((err) => console.log("Error while adding the new playdate: ", err));
 };
  return (
    <div>
      <h1>Create a Playdate</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => {setDescription(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={location}
            onChange={(e) => {setLocation(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => {setDate(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => {setTime(e.target.value)}}
            required
          />
        </div>
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePlaydatePage;
