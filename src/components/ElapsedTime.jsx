import { useState, useRef, useEffect } from "react";
import { formatTime } from "../utils/helper";

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

  return (
    <>
      <span className="badge" style={{fontFamily: "monospace", color: "white", fontSize: "0.85rem"}}>
        {formatTime(time)}
      </span>
    </>
  )
}

export default ElapsedTimer;