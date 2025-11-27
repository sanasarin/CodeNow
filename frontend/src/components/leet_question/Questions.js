import React, {useState} from 'react';
import './Questions.css'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Questions() {
    const [active, setActive] = useState("FirstCard")
    const [showButton, setShowButton] = useState(true);

    const [selectedOption, setSelectedOption] = useState('');
    const handleChange = event => {
        setSelectedOption(event.target.value);
    };
    return (
        <div id="home">
            <section>
                <div className='App'>
                    <div className='cards'>
                        {active === "FirstCard" &&
                            <Card>
                                <section className='Main'>
                                    <div>
                                        <span className='home-page'></span>
                                    </div>
                                    <h1>Practice the Question!</h1>
                                    <p>
                                        Get ready to tackle some mind-bending questions and unleash your coding
                                        potential!
                                        Before you start, here are a few things you should know:
                                    </p>
                                    <ul>
                                        <li>Read the instructions and problem statement carefully for the question.</li>
                                        <li>You can use any programming language you are comfortable with to solve the
                                            question.
                                        </li>
                                        <li>There is no time limit, so take your time and think through your solution
                                        </li>
                                        <li>Once you have completed a question, come back to this page and stop the
                                            timer! You will be promted with a few questions for us to track your
                                            progress!
                                        </li>
                                    </ul>
                                </section>

                            </Card>}
                        {active === "SecondCard" &&
                            <Card>
                                <section className='Question'>
                                    <h1>Are you done?</h1>
                                    <p>
                                        If you have successfully attempted the given problem,
                                        It is now time to go over a few questions to track your progress!
                                    </p>
                                </section>
                                <>

                                    <Form className='question-input'>
                                        <form>
                                            <div className='form'>
                                                <label className='Q1'>
                                                    Did you manage to complete this question?
                                                    <select value={selectedOption} onChange={handleChange} required>
                                                        <option value=""> ---</option>
                                                        <option value="option1">Yes</option>
                                                        <option value="option2">No</option>
                                                    </select>
                                                </label>
                                                <br></br>
                                                <label className='Q2'>
                                                    How long did you take to complete the question?
                                                    <input type="text" id="text" name="text" placeholder='ex. 10 mins'
                                                           required/>
                                                </label>
                                                <br></br>
                                                <label className='Q3'>
                                                    How dificult was the question from the range 1-5?
                                                    <label htmlFor="customRange2" className="form-label"></label>
                                                    <input type="range" className="form-range" min="0" max="5"
                                                           id="customRange2" required/>
                                                </label>
                                                <br></br>
                                                <button>Done</button>
                                            </div>
                                        </form>
                                    </Form>
                                </>
                            </Card>}
                        <nav>
                            {showButton && (
                                <a href="https://leetcode.com/problems/two-sum/" target="_blank" rel="noreferrer">
                                    <button onClick={() => {
                                        setActive("SecondCard");
                                        setShowButton(false);
                                    }}>
                                        Start
                                    </button>
                                </a>

                            )}
                        </nav>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Questions;