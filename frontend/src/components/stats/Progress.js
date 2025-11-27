// this is to make a progress component with progress bars for each skill
// spotlight card for putting certain stats front and center (ie highest skill, maybe total time spent coding, average time coding, etc)
import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function Progress(props) {

    return (

        <div>
            <p className="text-capitalize"><strong>{props.name}</strong></p>
            <ProgressBar variant="success" style={{width: '100%'}} label={`${props.value}%`} now={props.value} className=""/>
            <br />
        </div>

    );
}

export default Progress;