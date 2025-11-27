import React, { useState, useEffect } from "react";
import axios from 'axios';
import useToken from '../hooks/useToken';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export const Profile = () => {

    const [user, setUser] = useState({
        email: '',
        username: '',
        first_name: '',
        last_name: '',
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      const [successMessage, setSuccessMessage] = useState('');


    const {token} = useToken()
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    useEffect(() => {
        axios.get('http://localhost:8000/account/')
          .then(response => setUser(response.data))
          .catch(error => console.error(error));
      }, []);

      const handleNameChange = (e) => {
        e.preventDefault();

        const firstName = e.target.form[0].value.trim();
        const lastName = e.target.form[1].value.trim();

        let firstNameError = '';
        let lastNameError = '';

        if (!firstName) {
          firstNameError = 'Please provide your first name.';
        }

        if (!lastName) {
          lastNameError = 'Please provide your last name.';
        }

        if (firstNameError || lastNameError) {
          setErrors({
            firstName: firstNameError,
            lastName: lastNameError,
          });
          return;
        }

        axios
          .patch('http://localhost:8000/account/', {
            first_name: firstName,
            last_name: lastName,
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      const handleEmailChange = (e) => {
        e.preventDefault();

        const email = e.target.form[0].value.trim();

        let emailError = '';

        if (!email) {
          emailError = 'Please provide your email.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          emailError = 'Please provide a valid email.';
        }

        if (emailError) {
          setErrors({
            ...errors,
            email: emailError,
          });
          return;
        }

        axios
          .patch('http://localhost:8000/account/', {
            email: email,
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error(error.response.data.email);

            if (error.response.data.email)
            alert(error.response.data.email);
          });
      };

      const handlePasswordChange = (e) => {
        e.preventDefault();

        const password = e.target.form[0].value.trim();
        const confirmPassword = e.target.form[1].value.trim();

        let passwordError = '';
        let confirmPasswordError = '';

        if (!password) {
          passwordError = 'Please provide your new password.';
        } else if (password.length < 8) {
          passwordError = 'Password must be at least 8 characters.';
        }

        if (!confirmPassword) {
          confirmPasswordError = 'Please confirm your new password.';
        } else if (password !== confirmPassword) {
          confirmPasswordError = 'Passwords do not match.';
        }

        setErrors({
          ...errors,
          password: passwordError,
          confirmPassword: confirmPasswordError,
        });

        if (passwordError || confirmPasswordError) {
          return;
        }

        axios
          .patch('http://localhost:8000/account/', {
            password: password,
          })
          .then((response) => {
            setUser(response.data);
            // Clear error messages
            setErrors({
              ...errors,
              password: '',
              confirmPassword: '',
            });
            // Set success message
            setSuccessMessage('Password successfully changed.');
          })
          .catch((error) => {
            console.error(error);
          });
      };



    return (
        <div>
            <Container className="pt-3 pb-5">
                <h1>Profile Information</h1>
                 
                <Card className="mb-4 mb-lg-0 mt-3">
                    <Card.Body>
                        <Row>
                        <Col sm="5">
                            <Card.Text>First Name</Card.Text>
                        </Col>
                        <Col sm="7">
                            <Card.Text className="text-muted">{user.first_name ? user.first_name : 'No first name found'}</Card.Text>
                        </Col>
                        </Row>
                        <hr />
                        <Row>
                        <Col sm="5">
                            <Card.Text>Last Name</Card.Text>
                        </Col>
                        <Col sm="7">
                            <Card.Text className="text-muted">{user.last_name ? user.last_name : 'No last name found'}</Card.Text>
                        </Col>
                        </Row>
                        <hr />
                        <Row>
                        <Col sm="5">
                            <Card.Text>Email</Card.Text>
                        </Col>
                        <Col sm="7">
                            <Card.Text className="text-muted">{user.email ? user.email : 'No email found'}</Card.Text>
                        </Col>
                        </Row>
                        <hr />
                        <Row>
                        <Col sm="5">
                            <Card.Text>Username</Card.Text>
                        </Col>
                        <Col sm="7">
                            <Card.Text className="text-muted">{user.username}</Card.Text>
                        </Col>
                        </Row>
                        
                    </Card.Body>
                </Card>

                <br/>

                <Accordion>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Change Name</Accordion.Header>
            <Accordion.Body>
              <Form>
                <Form.Group className="mb-3" id="formBasicFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <Form.Text className="text-danger">
                      {errors.firstName}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" id="formBasicLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <Form.Text className="text-danger">
                      {errors.lastName}
                    </Form.Text>
                  )}
                </Form.Group>

                <Button
                  variant="success"
                  type="submit"
                  onClick={(e) => handleNameChange(e)}
                >
                  Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>


        <br/>

        <Accordion>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Change Email</Accordion.Header>
            <Accordion.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter new email" />
                {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>

                <Button variant="success" type="submit" onClick={(e) => handleEmailChange(e)}>
                    Submit
                </Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <br/>

        <Accordion>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Change Password</Accordion.Header>
            <Accordion.Body>
              <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter new password" />
                {errors.password && <p className="text-danger">{errors.password}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control type="password" placeholder="Retype new password" />
                {errors.confirmPassword && (
                    <p className="text-danger">{errors.confirmPassword}</p>
                )}
              </Form.Group>

              {successMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                    </div>
               )}

                <Button variant="success" type="submit" onClick={(e) => handlePasswordChange(e)}>
                    Submit
                </Button>

              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>



            </Container>
        </div>

    );
}

export default Profile;