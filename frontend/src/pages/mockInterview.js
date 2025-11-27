import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const MockInterview = () => {
    const cardData = [
      {
        title: 'Easy',
        description: "Step into coding with our easy mock interview! Tackle 2 LeetCode-style coding Qs & 1 behavioral Q to test communication skills. Gain confidence before the real deal!",
        buttonText: 'Start the interview'
      },
      {
        title: 'Medium',
        description: "Take your coding skills to the next level! Our medium mock interview features 2 challenging LeetCode-style coding Qs, 1 behavioral and 1 technical question to refine your skills. Don't miss out!",
        buttonText: 'Start the interview'
      },
      {
        title: 'Hard',
        description: "Ready for a challenge? Our hard mock interview puts your skills to the test! 2 medium and 1 hard LeetCode-style coding Qs, plus 2 technical questions that test communication & problem-solving. Showcase your expertise!",
        buttonText: 'Start the interview'
      }
    ];
  
    const cardItems = cardData.map((card, index) => (
        <Col key={index} md={4}>
          <Card style={{ height: '400px' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ paddingBottom: '1rem' }}>
                <Card.Title style={{ fontSize: '2rem', textAlign: 'center' }}>{card.title}</Card.Title>
                <p style={{ textAlign: 'center' }}>{card.description}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                {card.title === 'Easy' &&
                  <Link to='/easy-mock-interview-questions'><Button>{card.buttonText}</Button></Link>

                }
                {card.title === 'Medium' &&
                  <Link to='/medium-mock-interview-questions'>
                    <Button>{card.buttonText}</Button>
                  </Link>
                }
                {card.title === 'Hard' &&
                  <Link to='/hard-mock-interview-questions'>
                    <Button>{card.buttonText}</Button>
                  </Link>
                }
              </div>
            </Card.Body>
          </Card>
        </Col>
      ));
      
  
    return (
        <Container className="pt-5 pb-4">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h1 className="display-1 text-center">Mock Interview</h1>
              <h5 className="text-center mb-4">Practice for your job interview with our expertly crafted questions!</h5>
            </Col>
          </Row>
          <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <div className="card mb-4">
                <div className="card-body">
                <h5 className="card-title text-center mb-0" style={{ color: '#5A5A5A' }}>Please select the level of difficulty for your mock interview.</h5>
                </div>
            </div>
            </Col>
          </Row>
          <Row>
            {cardItems}
          </Row>
        </Container>
      );   
  };
  
  export default MockInterview;
  
