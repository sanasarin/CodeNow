import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import axios from "axios"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './quizpage.css'
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons';
import useToken from "../hooks/useToken";
import QuizItem from "./QuizItem";

export const QuizPage = () => {

    // TODO: make this global
    // authorization stuff
    const {token} = useToken()
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;

    const [showModal, setShowModal] = useState(false);
    const [sliderValues, setSliderValues] = useState({});

    // use effect ensures confidence is only fetched once.
    useEffect(() => {
        const fetchConfidenceData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/confidence/skill_assessment/');
            setSliderValues(response.data);
          } catch (error) {
            console.error('Error fetching confidence data:', error);
          }
        };

        fetchConfidenceData();
      }, []);


    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [modalText, setModalText] = useState('');
    const navigate = useNavigate();

    const [isStarted, setIsStarted] = useState(false);

    const handleStart = () => {
        setIsStarted(true);
    };
    const handleSaveAndContinue = () => {
        if (currentQuestion < 5) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (currentQuestion === 5) {
            setCurrentQuestion(6);
        } else {
            setShowModal(true);
            setSubmitted(true);
            setModalText("Thank you!");
        }
    };

    // submit quiz, revamped!
    const submitQuiz = () => {
        setShowModal(false);

        const updatedSliderValues = Object.entries(sliderValues).reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

        axios
          .put("http://localhost:8000/confidence/skill_assessment/", {
            user: "",
            ...updatedSliderValues,
          })
          .then((response) => {
            console.log(response);
            console.log("testing");
            if (response.data["error"]) {
              console.log(response.data["error"]);
            } else {
              navigate("/");
            }
          })
          .catch((error) => {
            console.log(error.response.data);
          });
    };

    const handleBackToQuestion = () => {
        if (currentQuestion > 1) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSliderChange = (question, value) => {
        setSliderValues({
          ...sliderValues,
          [question]: value,
        });
      };


      const renderModalTitle = () => {
        if (currentQuestion >= 1 && currentQuestion <= Object.keys(sliderValues).length) {
          return `Question ${currentQuestion}`;
        } else if (currentQuestion === Object.keys(sliderValues).length + 1) {
          return "Assessment complete!";
        } else {
          return "";
        }
      };

    const renderModalBody = () => {
        if (submitted) {
          return (
            <div>
              <p>{modalText}</p>
            </div>
          );
        }

        if (currentQuestion <= Object.keys(sliderValues).length) {
          const question = Object.keys(sliderValues)[currentQuestion - 1];
          const sliderValue = sliderValues[question];

          return (
            <QuizItem
              question={question}
              sliderValue={sliderValue}
              handleSliderChange={handleSliderChange}
            />
          );
        }

        if (currentQuestion === Object.keys(sliderValues).length + 1) {
          return (
            <div>
              <p>You have successfully completed the quiz. Please submit your results!</p>
            </div>
          );
        }

        return '';
      };

    return (
        <>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <FontAwesomeIcon icon={faClipboardCheck} size="10x"/>
            </div>
            <br></br>
            <Container className="d-flex justify-content-center align-items-center flex-column pt-5 pb-5"
                       style={{backgroundColor: '#F5F5F5', padding: '50px'}}>
                <h1 className="display-1 text-center mb-4">Welcome to the Pre-Assessment! </h1>
                <h3 className="text-center mb-4">We will use this assessment to identify which problems to assign to
                    you!</h3>
                {/* <Button variant="primary" onClick={handleStart}>Start</Button> */}
                {!isStarted && (
                    <div className="start-button-container"
                         style={{display: "grid", justifyContent: "center", alignItems: "center"}}>
                        <p className="text-center mb-4">To begin the assessment, simply click on the Start button.
                            Please answer these questions to the best of your ability.</p>
                        <Button
                            variant="primary"
                            onClick={() => {
                                handleStart();
                                setShowModal(true);
                            }}
                            className={submitted ? "hidden" : ""}
                        >
                            Start Assessment
                        </Button>
                    </div>

                )}

                {/* <QueryClientProvider client={ queryClient }>
          <GetPreProbs />
        </QueryClientProvider> */}
            </Container>

            <Modal show={showModal} onHide={() => {
            }} centered className="fade">
                <Modal.Header closeButton={!currentQuestion === 1}>
                    <Modal.Title>{renderModalTitle()}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="quiz-modal-body">{renderModalBody()}</div>
                </Modal.Body>
                <Modal.Footer>
                    {currentQuestion > 1 && currentQuestion !== Object.keys(sliderValues).length + 1 && (
                    <Button variant="secondary" onClick={handleBackToQuestion}>
                        Back to Question {currentQuestion - 1}
                    </Button>
                    )}
                    {currentQuestion < Object.keys(sliderValues).length ? (
                        <Button variant="primary" onClick={handleSaveAndContinue}>
                            Save and Continue
                        </Button>
                    ) : (
                    currentQuestion === Object.keys(sliderValues).length + 1 ? (
                        <Button onClick={() => submitQuiz()}>Submit Results</Button>
                    ) : (
                        <Button variant="primary" onClick={() => handleSaveAndContinue(false)}>
                            Save and Continue
                        </Button>
                    )
                    )}
              </Modal.Footer>
            </Modal>
            <style type="text/css">
                {`
                    .modal-backdrop.show {
                        opacity: 1 !important;
                    }
                `}
            </style>
        </>
    );
};

export default QuizPage;
