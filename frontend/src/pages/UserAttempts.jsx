import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserAttempts.css';

function UserAttempts({ problemId, token }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAttempts() {
      try {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        const response = await axios.get(`http://localhost:8000/problems/${problemId}/attempts/`);
        setAttempts(response.data.results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }
    fetchAttempts();
  }, [problemId, token]);

  if (loading) {
    return <div>Loading attempts data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (attempts.length === 0) {
    return <div>🚫 You have never attempted this problem.</div>;
  }

  return (
    <table className="user-attempts-table">
      <thead>
        <tr>
            <th>Date & Time</th>
          <th>Perceived Difficulty</th>
          <th>Time Taken</th>
      <th>Completed</th>
    </tr>
  </thead>
  <tbody>
    {attempts.map((attempt) => (
      <tr key={attempt.id}>
      <td>{new Date(attempt.date_time).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
        <td>{attempt.perceived_difficulty}</td>
        <td>{attempt.time_taken} minutes</td>
        <td>{attempt.completed ? '✅ Yes' : '❌ No'}</td>
      </tr>
    ))}
  </tbody>
</table>
  );
    }

export default UserAttempts;
