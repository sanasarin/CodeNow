import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Problems from "../components/Problems";
import useToken from "../hooks/useToken";

export const Dashboard = () => {
    const {token} = useToken()
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/problems/recommended/category/')
            .then(response => {
                const category = response.data.name;
                setCategoryName(category);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get('http://127.0.0.1:8000/confidence/skill_assessment/')
            .then(response => {
                const quizData = response.data;
                if (Object.values(quizData).some(val => val === 0)) {
                    setQuizCompleted(false);
                } else {
                    setQuizCompleted(true);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <Container className="pt-5 pb-5">
                {quizCompleted ? (
                    <div>
                        <h1 className="">Welcome back! 👋</h1>
                        <p className="fs-3">Our data shows that your weakest data structure is <strong>{categoryName}</strong>,
                            so we recommend the following {categoryName} problems to you.
                        </p>

                        <Problems />
                    </div>
                ) : (
                    <div>
                        <h1 className="">Welcome to CodeNext!</h1>
                        <h3>To get started, you are required to complete the <Link className="text-success" to="/skill-assessment">skill assessment</Link> in order for us to provide appropriate recommendations.</h3>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Dashboard;
