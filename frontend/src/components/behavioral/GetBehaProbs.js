import React from "react";
import BehavioralQuestion from './BehavioralQuestion'
import {useQuery} from 'react-query';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

export const GetBehaProbs = () => {

    const {data: problems, status} = useQuery('problems', async () => {
        const {data: problems} = await axios.get('http://localhost:8000/problems/behavioral_problems/');
        console.log(problems['problems'])
        return problems['problems']
    });


    return (
        <div>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'error' && <div>Error</div>}
            {status === 'success' && (
                <div className="row mt-1">
                    {problems.map(problem => (
                        <BehavioralQuestion
                            name={problem.name}
                            desc={problem.desc}
                            problem_id={problem.id}
                            key={problem.id}
                        />

                    ))}
                </div>
            )}
        </div>
    );
}

export default GetBehaProbs;