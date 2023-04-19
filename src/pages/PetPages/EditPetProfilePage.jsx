import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { BsCheckCircle } from "react-icons/bs";

function EditPetProfilePage () {
    const storedToken = localStorage.getItem("authToken");
    const [pet, setPet] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [newImageFile, setNewImageFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        age: 0,
        personality: '',
        imageUrl: ''
    });
    const { petId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        axios
            .get(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
            .then((response) => {
                const onePet = response.data;
                setPet(onePet);

                setImageUrl(onePet.imageUrl);

                setFormData({
                    name: onePet.name,
                    age: onePet.age,
                    personality: onePet.personality,
                });
                console.log(formData);
            })
            .catch((error) => console.log(error));
    }, [petId])

    const handleFileUpload = (e) => {
        e.preventDefault();
      
        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        setUploading(true);
    
        axios
          .post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, uploadData, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            const imageUrl = response.data.fileUrl;
            setNewImageFile(imageUrl);
            setFormData((prevState) => ({
              ...prevState, imageUrl: imageUrl
            }));
          })
          .catch((err) => console.log("Error while uploading the file: ", err))
          .finally(() => setUploading(false));
      };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const uploadData = new FormData();

        if (newImageFile) {
            uploadData.append("imageUrl", newImageFile);
        } else {
            uploadData.append("imageUrl", imageUrl);
        }

        axios 
            .put(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, formData, { headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => navigate("/pets"))
            .catch((err) => console.error(err));
            console.log(formData);
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
    }

    const deletePet = () => {

        axios
            .delete(`${process.env.REACT_APP_SERVER_URL}/api/pets/${petId}`, { headers: {Authorization: `Bearer ${storedToken}`}})
            .then(() => navigate('/pets'))
            .catch((err) => console.log(err));
    };

    return (
        <section>
          <h1>Edit Pet Details</h1>
          {pet && (
            <form onSubmit={handleFormSubmit}>
            <label> Name:
              <input type="text" name="name" value={formData.name} onChange={handleFormChange}/>
            </label>

            <label> Age:
              <input type="number" name="age" value={formData.age} onChange={handleFormChange}/>
            </label>
            
            <label> Personality:
                <select name="personality" value={formData.personality} onChange={handleFormChange}>
                    <option value="">select...</option>
                        {['introvert', 'outgoing', 'playful'].map((personality) => (
                    <option key={personality} value={personality}>{personality}</option>
                        ))}
                </select>
            </label>

            <label> Image:
                <img src={newImageFile || imageUrl} alt="current pet image"/>
                <input type="file" onChange={(e) => handleFileUpload(e)} />
                {uploading && <p>Image uploading<Spinner/></p>}
                {newImageFile && <BsCheckCircle color='green'/>}
          </label>

            <button type="submit">Update</button>
          </form>
          )}
          <button onClick={deletePet}>Delete Profile</button>
        </section>
    )
}

export default EditPetProfilePage;