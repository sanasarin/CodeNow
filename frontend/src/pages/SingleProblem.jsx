
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LeetQuestion from '../components/leet_question/LeetQuestion';
import UserAttempts from './UserAttempts.jsx';
import axios from 'axios';
import useToken from '../hooks/useToken';

function SingleProblem() {

  const { id } = useParams();

  const {token} = useToken();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProblem() {
      try {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        const response = await axios.get(`http://localhost:8000/problems/${id}/`);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchProblem();
  }, [id, token]);

  if (loading) {
    return <div>Loading problem data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mb-4 mt-4'>
      <h1>Selected Problem</h1>
      {problem && <LeetQuestion viewOnly={true} {...problem} />}

      <div className='mb-4 mt-4'>.</div>
      <h1 className='mt-4 mb-4'>Attempts</h1>

      <UserAttempts problemId={id} token={token} />

    </div>
  );
}

export default SingleProblem;