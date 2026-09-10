import { useState, useEffect } from 'react';

export default function useTimer(initialMinutes, onTimeUp) {
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isActive) {
      setIsActive(false);
      clearInterval(interval);
      if (onTimeUp) onTimeUp();
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSeconds, onTimeUp]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  
  // Format the time as HH:MM:SS
  const formatTime = () => {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const pad = (num) => num.toString().padStart(2, '0');
    
    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  return {
    remainingSeconds,
    formattedTime: formatTime(),
    start,
    pause,
    isActive,
    isWarning: remainingSeconds > 0 && remainingSeconds <= 300 // Last 5 minutes warning
  };
}
