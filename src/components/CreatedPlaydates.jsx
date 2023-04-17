// display all of the playdates that the logged in user created
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function CreatedPlaydates() {
    const [playdatesList, setPlaydatesList] = useState(null);

    const userId = localStorage.getItem('authToken');

    const loadPlaydates = () => {
        axios
            .get(`http://localhost:5005/api/playdates/?createdBy=${userId}`, { headers: {Authorization: `Bearer ${userId}`}})
            .then((response) => {
                const data = response.data;
                setPlaydatesList(data);
            })
            .catch((err) => console.log(err));
    }

    const renderList = () => {
        console.log(playdatesList);
        return(
            <section>
                <h1>These are your playdates</h1>
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
        loadPlaydates();
    }, []);

    return (
        <>
        {playdatesList ? renderList() : <h2>still loading...</h2>}
        </>
    )
}

export default CreatedPlaydates;