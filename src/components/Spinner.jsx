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
            <BeatLoader css={override} color="#F76C6C" />
        </div>
    )
}

export default Spinner;