import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';

import { Container, Row, Col, Button} from 'react-bootstrap';

const MockInterviewQuestionsHard = () => {
    return (
        <Container className="py-5">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h1 className="display-3 text-center mb-4">Lets get started!</h1>
              <h5 className="text-center mb-4">Level: Hard</h5>
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title text-center mb-0" style={{ color: '#5A5A5A' }}>
                    Note: This task should take approximately an hour and 30 minutes.
                  </h5>
                </div>
              </div>
              <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Question 1: LeetCode-style coding question</Accordion.Header>
                <Accordion.Body>
                    The next question is a medium-level LeetCode-style coding question about 
                    finding the longest palindromic substring in a given string. This is a common 
                    type of question that appears in technical interviews. It is expected to take 
                    approximately 15 minutes to complete. <br></br>                   
                    <Button variant="primary" href="https://leetcode.com/problems/longest-palindromic-substring/" target="_blank">Click here</Button>
                </Accordion.Body>
                </Accordion.Item>


                <Accordion.Item eventKey="1">
                  <Accordion.Header>Question 2: LeetCode-style coding question</Accordion.Header>
                  <Accordion.Body>
                  Reverse Integer is a LeetCode problem that requires you to reverse the digits of an input integer 
                  while preserving its sign. The estimated time to complete this problem is around 10 minutes. <br />
                    <Button variant="primary" href="https://leetcode.com/problems/reverse-integer/" target="_blank">Click here</Button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>Question 3: LeetCode-style coding question</Accordion.Header>
                  <Accordion.Body>
                  This question is focused on checking whether a string of parentheses is valid or not. 
                  Its a common question asked during technical interviews and is categorized as an easy-level question. 
                  Its estimated to take approximately 10 minutes to complete. <br />
                    <Button variant="primary" href="https://leetcode.com/problems/median-of-two-sorted-arrays/" target="_blank">Click here</Button>
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Question 4: Technical question</Accordion.Header>
                  <Accordion.Body>
                    How do you deal with code smells? <br></br> Hint: refactoring.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                  <Accordion.Header>Question 5: Technical question</Accordion.Header>
                  <Accordion.Body>
                   What are the main components of a clean architecture system?
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

export default MockInterviewQuestionsHard;
