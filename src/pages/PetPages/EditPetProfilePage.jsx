import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditPetProfilePage () {
    const storedToken = localStorage.getItem("authToken");
    const [pet, setPet] = useState(null);
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
            .get(`http://localhost:5005/api/pets/${petId}`, { headers: { Authorization: `Bearer ${storedToken}` }})
            .then((response) => {
                const onePet = response.data;
                setPet(onePet);
                setFormData({
                    name: onePet.name,
                    age: onePet.age,
                    personality: onePet.personality,
                    imageUrl: onePet.imageUrl
                });
                console.log(formData);
            })
            .catch((error) => console.log(error));
    }, [petId])

    const handleFormSubmit = (event) => {
        event.preventDefault();

        axios 
            .put(`http://localhost:5005/api/pets/${petId}`, formData, { headers: {Authorization: `Bearer ${storedToken}`}})
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
            .delete(`http://localhost:5005/api/pets/${petId}`, { headers: {Authorization: `Bearer ${storedToken}`}})
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

            <label> Image Url:
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleFormChange}/>
            </label>

            <button type="submit">Update</button>
          </form>
          )}
          <button onClick={deletePet}>Delete Profile</button>
        </section>
    )
}

export default EditPetProfilePage;