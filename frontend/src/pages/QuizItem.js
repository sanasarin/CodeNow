import { useState } from 'react';

const QuizItem = ({ question, sliderValue, handleSliderChange }) => {

  // styles
  const sliderStyle = {
    width: '100%',
    height: '6px',
    borderRadius: '5px',
    background: '#d3d3d3',
    outline: 'none',
    opacity: '0.7',
    transition: 'opacity .2s',
    WebkitAppearance: 'none'
  };

  const thumbStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#4CAF50',
    cursor: 'pointer',
    marginTop: '-9px',
    boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.2), 0 4px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12)'
  };

    // states
    const [sliderTouched, setSliderTouched] = useState(false)


  // helpers
  const renderSkillMessage = () => {

    if (!sliderTouched)
        return `Please use the slider to indicate your skill with ${question}.`
    if (sliderValue <= 10) {
      return `You have very little experience solving Leetcode questions involving ${question} 😅`;
    } else if (sliderValue <= 30) {
        return `You are somewhat comfortable with ${question}, but struggle with easy problems 😕`;
        } else if (sliderValue <= 60) {
        return `You can solve easy problems involving ${question} but struggle with medium problems 🤔`;
        } else if (sliderValue <= 80) {
        return `You can solve most medium problems involving ${question} in a timely manner but struggle with hard problems 😎`;
        } else {
        return `You are a skilled warrior at solving problems ${question} problems! 💪`;
    }
    };

    const handleSliderChangeWrapper = (question, value) => {
        handleSliderChange(question, value)
        setSliderTouched(true)
    }

  return (
    <>
      <p>How comfortable are you solving Leetcode problems with the <strong>{question}</strong> data structure?</p>
      <div className="slider-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="slider-label me-4"> Uncomfortable </span>
        <input
          type="range"
          min="1"
          max="100"
        value={sliderValue}
        className="slider"
        style={{ ...sliderStyle, WebkitSliderThumb: { ...thumbStyle }, WebkitSliderRunnableTrack: { ...sliderStyle } }}
        onChange={(event) => handleSliderChangeWrapper(question, parseInt(event.target.value))}
        />
        <span className="slider-label ms-4"> Very comfortable </span>
        </div>

        <p className="skill-message mt-4" style={{ textAlign: 'center' }}>{renderSkillMessage()}</p>
        </>
        );
        };

        export default QuizItem;
