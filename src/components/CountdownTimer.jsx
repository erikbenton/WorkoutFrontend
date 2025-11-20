import { useState, useRef, useEffect } from "react";
import { formatTime } from "../utils/helper";

const INTERVAL_TIME = 100;

const CountdownTimer = ({ startTime, totalTime }) => {
  const [hours, minutes, seconds] = totalTime.split(":");
  const totalTimeSeconds = (hours * 60 * 60) + (minutes * 60) + Number(seconds);
  const startTimeRef = useRef(startTime);
  const totalTimeRef = useRef(totalTimeSeconds * 1000);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const timeElapsed = Date.now() - startTimeRef.current;
      setTime(timeElapsed);
    }, INTERVAL_TIME)

    return () => clearInterval(intervalId);
  }, [])

  // Make sure the count down time is rounding up to the sec
  // eg: 59,999 msec -> 59.999 -> 60 sec, not 59 sec
  //     59,001 msec -> 59.001 -> 60 sec, not 59 sec
  const countDownTimeActual = Math.ceil((totalTimeRef.current - time) / 1000) * 1000;
  const countDownTime = Math.abs(countDownTimeActual);
  const sign = countDownTimeActual > 0 ? "" : "-";

  return (
    <>
      <span
        className={(sign === "-" ? "rounded-pill text-bg-secondary" : "rounded-pill text-bg-primary") + " badge"}
        style={{ fontFamily: "monospace", color: "white" }}
      >
        {formatTime(countDownTime)}
      </span>
    </>
  )
}

export default CountdownTimer;