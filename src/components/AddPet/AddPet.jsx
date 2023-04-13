import { useState, useEffect } from 'react';
import axios from 'axios';

function AddPet() {
    const [ newPet, setNewPet ] = useState({
        name: '',
        age: 0,
        species: ''
    })

    const changeHandler = (target) => {
        setNewPet((prevState) => {
            return {...prevState, [target.name] : target.value}
        })
    }

    const storedToken = localStorage.getItem('authToken');

    const submitForm = (event, userId) => {
        event.preventDefault();
        console.log(newPet);
        axios
          .post('http://localhost:5005/api/pets/', { ...newPet, owner: userId }, { headers: {Authorization: `Bearer ${storedToken}`}})
          .then((response) => {
            console.log(response);
            //navigate("/");
          })
          .catch((err) => console.error(err));
      }
    
      return (
        <section>
          <h1>Create Pet</h1>
          <form onSubmit={(event) => {submitForm(event)}}>
            <label> Name:
              <input type="text" name="name" value={newPet.name} onChange={(event)=>{changeHandler(event.target)}}/>
            </label>
            <label> Age:
              <input type="number" name="age" value={newPet.age} onChange={(event)=>{changeHandler(event.target)}}/>
            </label>
            <label> Species:
              <input type="text" name="species" value={newPet.species} onChange={(event)=>{changeHandler(event.target)}}/>
            </label>
            <button type="submit">Create</button>
          </form>
        </section>
      
    
      );  
}

export default AddPet;