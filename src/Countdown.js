
import React, { useState, useEffect } from 'react';

function Countdown({targetDate}) {
  const [isLoading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    //Loading Delay: Implement a 5-second loading delay before displaying the countdown page, marked by a loading spinner. (The spinner can be of any design, but it should be visible to the user for 5 seconds, typically encompassing the whole page with a central loading animation.)
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    
    const intervalId = setInterval(() => {
      const timeRemaining = targetDate - new Date();

      if (timeRemaining <= 0) {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
      } else{
        
        const secondsR = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        const minutesR = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const hoursR = Math.floor(timeRemaining / (1000 * 60 * 60));

        //Update Timer Every Second
        setSeconds(secondsR);
        setMinutes(minutesR);
        setHours(hoursR);
      }
    }, 1000);
    
    return () => {
      clearInterval(loadingTimer);
      clearInterval(intervalId);
    };
  }, [])

  const formatDate = (targetDate) => {
    const date = new Date(targetDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const day = date.getDate()
    let suffix = `${day}th`

    if (!(day >= 11 && day <= 13)) {
      switch (day % 10) {
        case 1: 
          suffix = `${day}st`;
          break;
        case 2: 
          suffix = `${day}nd`;
          break;
        case 3:
          suffix = `${day}rd`;
          break;
        default: 
          suffix = `${day}th`;
          break;
      }
    }
    return `${monthNames[date.getMonth()]} ${suffix}, ${date.getFullYear()}`;
  };

  const formatTimerNum = (num) => {
    return num >= 10 ? `${num}` : `0${num}`;
  }

  return (
    <div className="Countdown">
      {isLoading ? (
        <div className="loading-container">
        <div className="loader"></div>
        <h2 className="title">Please Wait...</h2>
      </div>
      ) : (
        <div>
          <h1 className="title">BALENCIAGA<br/>WINTER 24 COLLECTION</h1>
          <div className="timer">
            <div className="timer-item">
              <div className="timer-number">{formatTimerNum(hours)}</div>
              <div className="timer-label">HOURS</div>
            </div>

            <div className="colon">
              <div>:</div>
              <div className="spacer"></div>
            </div>

            <div className="timer-item">
              <div className="timer-number">{formatTimerNum(minutes)}</div>
              <div className="timer-label">MINUTES</div>
            </div>

            <div className="colon">
              <div>:</div>
              <div className="spacer"></div>
            </div>

            <div className="timer-item">
              <div className="timer-number">{formatTimerNum(seconds)}</div>
              <div className="timer-label">SECONDS</div>
            </div>

          </div>
          <div className="date-text">{formatDate(targetDate)}</div>
        </div>
      )}
      
    </div>
  );
}

export default Countdown;