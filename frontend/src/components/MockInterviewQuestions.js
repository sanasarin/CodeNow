import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

import { Container, Row, Col, Button} from 'react-bootstrap';

const MockInterviewQuestions = () => {
    return (
        <Container className="py-5">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="display-3 text-center mb-4">Lets get started!</h1>
              <h5 className="text-center mb-4">Level: Easy</h5>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title text-center mb-0" style={{ color: '#5A5A5A' }}>
                    Note: This task should take approximately 30 minutes.
                  </h5>
                </div>
              </div>
              <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Question 1: LeetCode-style coding question</Accordion.Header>
                <Accordion.Body>
                    This question is about removing duplicates from a sorted array and is a commonly asked question during coding interviews. The task should take approximately 10 minutes to complete. <br />
                    <Button variant="primary" href="https://leetcode.com/problems/remove-duplicates-from-sorted-array/" target="_blank">Click here</Button>
                </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="1">
                  <Accordion.Header>Question 2: LeetCode-style coding question</Accordion.Header>
                  <Accordion.Body>
                  This question is focused on checking whether a string of parentheses is valid or not. 
                  Its a common question asked during technical interviews and is categorized as an easy-level question. 
                  Its estimated to take approximately 10 minutes to complete. <br />
                    <Button variant="primary" href="https://leetcode.com/problems/valid-parentheses/" target="_blank">Click here</Button>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Question 3: Behavioral question</Accordion.Header>
                  <Accordion.Body>
                  What was a critical decision you made on a previous project, and how did you approach it?
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

export default MockInterviewQuestions;
