import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CreatedPlaydates from "../../components/CreatedPlaydates";

function MyPlaydatesPage() {

    return (
        <>
            <h1>My Playdates</h1>
            <CreatedPlaydates />

            {/* component for liked playdates */}
        </>
    )
}

export default MyPlaydatesPage;