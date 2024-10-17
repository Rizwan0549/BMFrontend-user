import React, { createContext, useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const { seconds, minutes, hours, start, pause, reset } = useStopwatch({ autoStart: true });
  
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  useEffect(() => {
    const savedTimerState = localStorage.getItem('isTimerActive');
    if (savedTimerState) {
      setIsTimerActive(JSON.parse(savedTimerState));
      start();  // Start the timer if it was active
    }
  }, [start]);

  const startTimer = () => {
    setIsTimerActive(true);
    localStorage.setItem('isTimerActive', true);
    start();
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    localStorage.removeItem('isTimerActive');
    pause();
  };

  const resetTimerOnly = () => {
    reset();
  };

  return (
    <TimerContext.Provider value={{ seconds, minutes, hours, startTimer, stopTimer, resetTimerOnly, isTimerActive }}>
      {children}
    </TimerContext.Provider>
  );
};
