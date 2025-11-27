import React from 'react'
import Problems from '../components/Problems'

function AllProblems() {
  return (
    <div className='container pt-5 pb-5'>
        <h1>Browse Problems</h1>
        <p>Explore and attempt our entire catalog of supported Leetcode problems.</p>
        <Problems endPoint='/problems/' />
    </div>
  )
}

export default AllProblems