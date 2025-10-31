import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateRunningWorkout } from "../../reducers/runningWorkout";
import { Button } from "react-bootstrap";

const RunningWorkoutName = () => {
  const [editWorkoutName, setEditWorkoutName] = useState(false);
  const runningWorkout = useSelector(state => state.runningWorkout);
  const dispatch = useDispatch();

  const updateWorkoutName = (e) => {
    const field = e.target.id;
    const value = e.target.value;
    dispatch(updateRunningWorkout({ field, value }))
  }

  return (
    <h1 onDoubleClick={() => setEditWorkoutName(true)}>
      {editWorkoutName
        ? <input
          type="text"
          id="name"
          value={runningWorkout.name}
          onChange={(e) => updateWorkoutName(e)}
          onBlur={() => setEditWorkoutName(false)}
        />
        : runningWorkout.name}
      <Button variant="primary" size="sm" type="button" onClick={() => setEditWorkoutName(!editWorkoutName)}>
        {editWorkoutName ? "save" : "edit"}
      </Button>
    </h1>
  )
}

export default RunningWorkoutName;