import { useState, useRef, useEffect } from 'react'

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const INTERVAL_TIME = 100;

const ElapsedTimer = ({ startTime }) => {
  const startTimeRef = useRef(startTime);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      setTime(timeElapsed);
    }, INTERVAL_TIME)

    return () => clearInterval(intervalId);
  }, [])

  const hours = Math.floor(time / HOUR);
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = Math.floor((time / SECOND) % 60);

  return (
    <>
      <span style={{fontFamily: "monospace"}}>
        {(hours < 10 ? "0" : "") + hours}:{(minutes < 10 ? "0" : "") + minutes}:{(seconds < 10 ? '0' : '') + seconds}
      </span>
    </>
  )
}

export default ElapsedTimer;