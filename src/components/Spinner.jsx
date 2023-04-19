import React, {useState} from "react";
import {BeatLoader} from "react-spinners";

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
}

function Spinner() {
    return (
        <div>
            <BeatLoader css={override} />
        </div>
    )
}

export default Spinner;