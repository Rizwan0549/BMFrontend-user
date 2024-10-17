import React, { useContext } from 'react';
import { TimerContext } from '../../Context/TimerContext';
const Timer = () => {
  const { seconds, minutes, hours } = useContext(TimerContext);

  return (
    <div>
      <h3>Time Elapsed: {hours}:{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h3>
    </div>
  );
};

export default Timer;
