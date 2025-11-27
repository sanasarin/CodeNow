import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

import { Container, Row, Col, Button} from 'react-bootstrap';

const MockInterviewQuestionsMedium = () => {
    return (
        <Container className="py-5">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="display-3 text-center mb-4">Lets get started!</h1>
              <h5 className="text-center mb-4">Level: Medium</h5>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title text-center mb-0" style={{ color: '#5A5A5A' }}>
                    Note: This task should take approximately 45 minutes.
                  </h5>
                </div>
              </div>
              <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Question 1: LeetCode-style coding question</Accordion.Header>
                <Accordion.Body>
                This question is a medium level problem commonly seen in coding interviews. The task is to find the minimum cost of tickets for a certain duration of days, given the cost of daily, weekly, and monthly tickets. It requires a dynamic programming approach to solve. This question is expected to take around 15 minutes to complete. <br></br>                    
                <Button variant="primary" href="https://leetcode.com/problems/minimum-cost-for-tickets/" target="_blank">Click here</Button>
                </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Question 2: LeetCode-style coding question</Accordion.Header>
                  <Accordion.Body>
                  The next question is a medium-level problem called Container With Most Water. This question involves finding the maximum area that can be formed between two vertical lines in a given histogram. 
                  It should take approximately 15 minutes to complete. <br />
                    <Button variant="primary" href="https://leetcode.com/problems/container-with-most-water/" target="_blank">Click here</Button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Question 3: Behavioral question</Accordion.Header>
                  <Accordion.Body>
                    Describe how you would approach reviewing another team members code.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Question 4: Technical question</Accordion.Header>
                  <Accordion.Body>
                    Do you have experience with an Agile software development process? Explain.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/mockinterview">
                    <Button variant="primary">Go back</Button>
                </Link>
              </div>
            </Col>
          </Row>   
        </Container>
      );
    };

export default MockInterviewQuestionsMedium;
