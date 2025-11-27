import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from "react-router-dom";

function About() {
    return (
        <div>
            <div className="container d-flex justify-content-center mt-5">
                <Card bg="light">
                    <Card.Body>
                        <Card.Title className="text-center" style={{fontSize: '1.4rem', color: 'black'}}>What is Spaced
                            Repetition?</Card.Title>
                        <Card.Text className="text-center" style={{fontSize: '1.2rem', color: 'black'}}>
                            Spaced repetition is a learning technique that involves reviewing
                            material at increasing intervals of time. By incorporating spaced
                            repetition into CodeNext, we aim to help our users retain information
                            and develop a deeper understanding of the material. By practicing
                            questions multiple times, users will be less likely to forget the information
                            they have learned and will avoid the Forgetting Curve phenomenon. This will ultimately lead
                            to improved performance
                            and increased confidence in their abilities. Our commitment to incorporating
                            this technique into CodeNext highlights our dedication to providing our
                            users with a high-quality learning experience that is both effective and efficient.
                        </Card.Text>
                        <Card.Title className="text-center" style={{fontSize: '1.4rem', color: 'black'}}>How does
                            CodeNext utilize Spaced Repetition?</Card.Title>
                        <Card.Text className="text-center" style={{fontSize: '1.2rem', color: 'black'}}>
                            CodeNext utilizes the spaced repetition strategy by sending notifications to users,
                            asking them to repeat the coding questions they have previously attempted.
                            This helps the user to retain knowledge, improve their understanding of coding concepts,
                            and ultimately become better coders. By incorporating spaced repetition into our platform,
                            we are committed to providing the best possible learning experience for our users.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <h5>So what are you waiting for?</h5>
            </div>
            <div className="d-flex justify-content-center">
                <Link to="/register">
                    <button className="btn btn-primary pe-4 ps-4"> Register Now!</button>
                </Link>
            </div>
        </div>
    );
}

export default About;
