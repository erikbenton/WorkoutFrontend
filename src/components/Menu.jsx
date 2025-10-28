import { useMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ElapsedTimer from "./ElapsedTime";

const Menu = () => {
  const match = useMatch("/runningWorkout")
  const runningWorkout = useSelector(state => state.runningWorkout)
  const padding = {
    padding: "0.25rem"
  }
  return (
    <div>
      <Link style={padding} to="/">Home</Link>
      <Link style={padding} to="/Programs">Programs</Link>
      <Link style={padding} to="/Workouts">Workouts</Link>
      <Link style={padding} to="/Exercises">Exercises</Link>
      {(!match || !runningWorkout)
        && <Link style={padding} to="/runningWorkout">
          {runningWorkout ? "Continue Workout" : "Do a Workout"}
        </Link>
      }
      {runningWorkout && <ElapsedTimer startTime={Date.parse(runningWorkout.startTime)} />}
    </div>
  )
}

export default Menu;