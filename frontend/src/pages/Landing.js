import Card from 'react-bootstrap/Card';
import React from "react";
import {Link} from "react-router-dom";
import Col from 'react-bootstrap/Col';

/* eslint-disable no-unused-vars */
export const Landing = () => {
    const cardInfo = [
        {
            title: "Tailored Plan", text:
                <ul style={{fontSize: "1.2rem", lineHeight: "2rem"}} className="mx-auto">
                    <li>Assessment to dictate concepts you need a better understanding.</li>
                    <li>Personalized road map following the assessment.</li>
                    <li>No need to wonder where to start.</li>
                </ul>
        },
        {
            title: "Distributed Practice", text:
                <ul style={{fontSize: "1.2rem", lineHeight: "2rem"}} className="mx-auto">
                    <li>Precision practice of selected questions.</li>
                    <li>Distributed learning strategy to enhance your understanding of the concepts.</li>
                    <li>Better Retention.</li>
                </ul>
        },
        {
            title: "Track Your Progress", text:
                <ul style={{fontSize: "1.2rem", lineHeight: "2rem"}} className="mx-auto">
                    <li>Manage and track your progress as you use our platform.</li>
                    <li>See a visualization of your progress.</li>
                    <li>Record key metrics like time taken and perceived difficulty.</li>
                </ul>
        },
    ];

    const renderCard = (card, index) => {
        return (
            <Col>
                <Card style={{height: '20rem'}} key={index}>
                    <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Text className="mx-auto">
                            {card.text}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    };

    return (
        <div>
            <div className="container mt-4 w-100">

                <h1 className="fw-bold mx-auto">Code Next</h1>
                <h3>
                    Everything you need to excel in your next software interview
                    is now made available through code-next.
                </h3>

                <div className="row mt-4">
                    {cardInfo.map(renderCard)}
                </div>

                <div className="d-flex justify-content-center mt-5">
                    <Link to="/register">
                        <button className="btn btn-secondary btn-lg me-4"> Register Now!</button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Landing;
/* eslint-enable no-unused-vars */
