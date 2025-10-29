import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateRunningWorkout } from "../../reducers/runningWorkout";

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
      <button type="button" onClick={() => setEditWorkoutName(!editWorkoutName)}>
        {editWorkoutName ? "save" : "edit"}
      </button>
    </h1>
  )
}

export default RunningWorkoutName;