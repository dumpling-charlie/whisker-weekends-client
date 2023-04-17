import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from 'jwt-decode';

function LikedPlaydates() {

    const [playdatesList, setPlaydatesList] = useState(null);
    const [userId, setUserId] = useState();
    const storedToken = localStorage.getItem('authToken');

    const loadPlaydates = () => { 

        axios
            .get(`http://localhost:5005/api/playdates`, { headers: {Authorization: `Bearer ${storedToken}`}})
            .then((response) => {
                const likedPlaydates = response.data.filter(
                    (playdate) => playdate.likedBy.includes(userId)
                );
                setPlaydatesList(likedPlaydates);
            })
            .catch((err) => console.log(err));
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
      }, [userId]);

    const renderList = () => {
        return(
            <section>
                <h3>These are the playdates you've liked!</h3>
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

    return (
        <>
        {playdatesList ? renderList() : <h2>still loading...</h2>}
        </>
    )
}

export default LikedPlaydates;