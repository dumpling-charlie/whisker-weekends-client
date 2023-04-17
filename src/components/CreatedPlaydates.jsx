// display all of the playdates that the logged in user created
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';
import { Link } from "react-router-dom";


function CreatedPlaydates() {
    const [playdatesList, setPlaydatesList] = useState(null);
    const [userId, setUserId] = useState(null);
    const storedToken = localStorage.getItem('authToken');

    const loadPlaydates = () => { 
        axios
            .get(`http://localhost:5005/api/playdates`, { headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                const createdPlaydates = response.data.filter(
                    (playdate) => playdate.createdBy === userId
                );
                setPlaydatesList(createdPlaydates);
            })
            .catch((err) => console.log(err));
    }

    const renderList = () => {
        return(
            <section>
                <h3>These are the playdates you've created!</h3>
                {playdatesList.map((playdate, index) => {
                    return (
                    <div key={index}>
                        <h4>{playdate.title}</h4>
                    </div>
                    )
                })} 
            </section>
        )
    }

    useEffect(() => {
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);
            setUserId(decodedToken._id);
        }
    }, [storedToken]);

    useEffect(() => {
        if (userId !== null) {
            loadPlaydates();
        }
    }, [userId])

    return (
        <>
        {playdatesList ? renderList() : <h2>still loading...</h2>}
        </>
    )
}

export default CreatedPlaydates;