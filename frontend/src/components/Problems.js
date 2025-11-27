import React, { useState, useEffect, useRef } from "react";
import LeetQuestion from "./leet_question/LeetQuestion";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export const Problems = ({ endPoint }) => {
  const [problems, setProblems] = useState([]);
  const [status, setStatus] = useState("loading");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const [observer, setObserver] = useState(null);
  const loaderRef = useRef(null);

  const handleAttemptedProblem = (id) => {
    // Find the index of the problem with the given ID in the problems state
    const problemIndex = problems.findIndex((problem) => problem.id === id);
    // If the problem was found, update its 'attempted' field in the state
    if (problemIndex !== -1) {
      setProblems((prevProblems) => {
        const newProblems = [...prevProblems];
        newProblems[problemIndex] = { ...newProblems[problemIndex], attempted: true };
        return newProblems;
      });
    }
  };

  useEffect(() => {
    const fetchProblems = async () => {
      if (status === "success" && !pagination.next) return;

      setStatus("loading");
      try {
        const { data: problemsData } = await axios.get(
          `http://localhost:8000${endPoint}?page=${page}`
        );
        setProblems((prevProblems) => [...prevProblems, ...problemsData["results"]]);
        setPagination({ next: problemsData["next"], previous: problemsData["previous"] });
        setStatus("success");
        } catch (error) {
        setStatus("error");
        }
        };

        fetchProblems();
        }, [page]);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observerCallback = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (pagination.next) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const newObserver = new IntersectionObserver(observerCallback, options);
    setObserver(newObserver);

    return () => {
      if (observer) observer.disconnect();
    };
  }, [pagination.next]);

  useEffect(() => {
    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer && loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [observer, loaderRef]);


  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error</div>}
      {status === "success" && (
        <ul className="px-0">
          {problems.map((problem) => (
            <LeetQuestion
              name={problem.name}
              url={problem.leetcode_url}
              difficulty={problem.difficulty}
              id={problem.id}
              key={problem.id}
              categories={problem.categories}
              attempted={problem.attempted}
              setAttempt = {handleAttemptedProblem}
            />
          ))}
        </ul>
      )}
      <div ref={loaderRef} style={{ height: "1px" }}></div>
    </>
  );
};

Problems.defaultProps = {
  endPoint: '/problems/recommended/'
};


export default Problems;
