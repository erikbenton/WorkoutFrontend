import { useState, useRef, useEffect } from "react";
import { formatTime } from "../utils/helper";

const INTERVAL_TIME = 100;

const CountdownTimer = ({ startTime, totalTime }) => {
  const [hours, minutes, seconds] = totalTime.split(":");
  const totalTimeSeconds = (hours * 60 * 60) + (minutes * 60) + Number(seconds);
  const startTimeRef = useRef(startTime);
  const totalTimeRef = useRef(totalTimeSeconds);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      setTime(timeElapsed);
    }, INTERVAL_TIME)

    return () => clearInterval(intervalId);
  }, [])

  // Make sure the count down time is "rounding up"
  // eg: 59,999 msec -> 60 sec, not 59 sec
  const countDownTimeActual = (totalTimeRef.current * 1000) - Math.floor(time / 1000) * 1000;
  const countDownTime = Math.abs(countDownTimeActual);
  const sign = countDownTimeActual > 0 ? "" : "-";

  return (
    <>
      <span className={sign === "-" ? "bg-danger-subtle" : ""} style={{ fontFamily: "monospace" }}>
        {formatTime(countDownTime)}
      </span>
    </>
  )
}

export default CountdownTimer;