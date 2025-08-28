import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  //State Management
  //State for the work duration, adjustable by the user
  const [minutes, setMinutes] = useState(15);
  //State for the seconds on the display
  const [seconds, setSeconds] = useState(0);
  //State to track if the timer is running or paused
  const [isActive, setIsActive] = useState(false);

  //Countdown Logic
  useEffect(() => {
    let interval = null;

    //Only run the interval if the timer is active
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            //Decrement minute and reset seconds to 59
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            //Timer has finished
            setIsActive(false);
          }
        } else {
          //Decrement seconds
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      //If timer is not active, clear any exsisting interval
      clearInterval(interval);
    }
    //Cleanup functionL runs when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]); //Dependencies: This effect runs when these values change

  //JSX for the UI
  return (
    <div className="timer-container">
      <div className="time-display">
        {/* Format numbers to have a leading zero if they are less than 10 */}
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className="controls">
        <button onClick={() => setIsActive(!isActive)}>
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setMinutes(15);
            setSeconds(0);
          }}
        >
          Reset
        </button>
      </div>

      <div className="progressive-controls">
        <h3>Set Work Time:</h3>
        {/* Prevent minutes from going below 1 */}
        <button onClick={() => setMinutes((prev) => (prev > 1 ? prev - 1 : 1))}>
          -
        </button>
        <span>{minutes} minutes</span>
        <button onClick={() => setMinutes(minutes + 1)}>+</button>
      </div>
    </div>
  );
}

export default Timer;
