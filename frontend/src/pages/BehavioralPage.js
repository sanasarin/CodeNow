import React from "react";
import Container from 'react-bootstrap/Container';
import {QueryClient, QueryClientProvider} from 'react-query';
// import BehavioralQuestion from './BehavioralQuestion';
import GetBehaProbs from '../components/behavioral/GetBehaProbs';

const queryClient = new QueryClient();

/* eslint-disable no-unused-vars */

export const BehavioralPage = (props) => {
    return (
        <div>
            <Container className="pt-5 pb-5">

                <h1 className="display-1">Welcome to Behavioral Questions! </h1>
                <h3>Here you will be given common behavioral questions asked during interviews. </h3>
                <p>These are slightly different from questions on your dashboard.
                    To answer these questions, think of your past experiences and what you have learned.</p>

                <p>Remember to use the STAR method</p>
                <ul>
                    <li><strong>Situation:</strong> Set the scene and give the necessary details of your example</li>
                    <li><strong>Task:</strong> Describe what your responsibility was in that situation</li>
                    <li><strong>Action:</strong> Explain exactly what steps you took to address it</li>
                    <li><strong>Result:</strong> Share what outcomes your actions achieved</li>
                    {/* Taken from https://www.themuse.com/advice/star-interview-method */}
                </ul>

                {/* <div className="row mt-1"> */}
                <QueryClientProvider client={queryClient}>
                    <GetBehaProbs/>
                </QueryClientProvider>
                {/* </div> */}
            </Container>
        </div>

    );
}

export default BehavioralPage;
/* eslint-enable no-unused-vars */