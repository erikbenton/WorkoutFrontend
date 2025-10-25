import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/useFetch";
import { clearActiveExerciseGroup, clearRunningWorkout, initializeRunningWorkout, removeExerciseSet, selectActiveExerciseGroup, shiftExerciseGroup, updateExerciseGroup, updateExerciseSet } from "../../reducers/runningWorkout";
import { Link, useNavigate } from "react-router-dom";
import { addExerciseSet } from "../../reducers/runningWorkout";

const AvailableWorkouts = () => {
  const { data: workouts, loading, error } = useFetch('workouts');
  const dispatch = useDispatch();

  const selectWorkout = workout => {
    dispatch(initializeRunningWorkout(workout.id));
  }

  if (loading) return <h1>Loading workouts...</h1>
  if (error) return <h1>Error getting workouts</h1>

  return (
    <ul>
      {workouts.map(workout => (
        <li key={workout.id} onClick={() => selectWorkout(workout)}>
          <Link>
            {workout.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const ActiveExerciseGroup = ({ exerciseGroup }) => {
  const dispatch = useDispatch()

  const backToSummary = () => {
    dispatch(clearActiveExerciseGroup())
  }

  const updateGroup = (e) => {
    const [field] = e.target.id.split("_");
    const value = e.target.value;
    dispatch(updateExerciseGroup({
      groupKey: exerciseGroup.key,
      field,
      value
    }))
  }

  const updateSet = (e, set) => {
    const [field] = e.target.id.split("_");
    const value = e.target.value;
    dispatch(updateExerciseSet({
      groupKey: exerciseGroup.key,
      setKey: set.key,
      field,
      value
    }));
  }

  const addSet = () => {
    dispatch(addExerciseSet({ groupKey: exerciseGroup.key }))
  }

  const removeSet = (set) => {
    dispatch(removeExerciseSet({
      groupKey: exerciseGroup.key,
      setKey: set.key
    }));
  }

  const markSetCompleted = set => {
    if (set.reps && set.reps > -1) {
      dispatch(updateExerciseSet({
        groupKey: exerciseGroup.key,
        setKey: set.key,
        field: "completed",
        value: true
      }));
    } else {
      alert("A set's reps must be non-negative.")
    }
  }

  const repsPlaceholderText = set =>
    `${set.minReps ? set.minReps : ''}${(set.minReps && set.maxReps) ? '-' : ''}${set.maxReps ? set.maxReps : ''}`

  const weightPlaceholderText = set => set.targetWeight ? `${set.targetWeight} lbs` : ''

  return (
    <div>
      <button type="button" onClick={backToSummary}>Back to summary</button>
      <h2>
        <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
          {exerciseGroup.exercise.name}
        </Link>
      </h2>
      {exerciseGroup.note && <p>{exerciseGroup.note}</p>}
      <ol>
        {exerciseGroup.exerciseSets.map(set => (
          <li key={set.key}>
            <label>Reps
              <input type="number" id={`reps_${set.key}`} value={set.reps ?? ""} onChange={(e) => updateSet(e, set)} placeholder={repsPlaceholderText(set)} />
            </label>
            <label>Weight
              <input type="number" id={`weight_${set.key}`} value={set.weight ?? ""} onChange={(e) => updateSet(e, set)} placeholder={weightPlaceholderText(set)} />
            </label>
            <button type="button" disabled={set.completed} onClick={() => markSetCompleted(set)}>completed</button>
            <button type="button" onClick={() => removeSet(set)}>remove set</button>
          </li>
        ))}
      </ol>
      <button type="button" onClick={addSet}>Add set</button>
      <br />
      <label>Comment
        <input type="text" id={`comment_${exerciseGroup.key}`} value={exerciseGroup.comment ?? ""} onChange={(e) => updateGroup(e)} />
      </label>
    </div>
  )
}

const RunningWorkoutSummary = () => {
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  const selectExerciseGroup = group => {
    dispatch(selectActiveExerciseGroup(group.key))
  }

  const shiftGroup = (group, shiftAmount) => {
    dispatch(shiftExerciseGroup({
      groupKey: group.key,
      shiftAmount
    }));
  }

  return (
    <>
      <ol>
        {runningWorkout.exerciseGroups.map(group => (
          <li key={group.key}>
            <Link onClick={() => selectExerciseGroup(group)}>
              {group.exercise.name} - {group.exerciseSets.length} sets
            </Link>
            <button type="button" onClick={() => shiftGroup(group, -1)}>shift UP</button>
            <button type="button" onClick={() => shiftGroup(group, 1)}>shift DOWN</button>
          </li>
        ))}
      </ol>
    </>
  )
}

const RunningWorkout = () => {
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cancelWorkout = () => {
    const cancelingWorkout = confirm("Cancel the current workout?")
    if (cancelingWorkout) {
      dispatch(clearRunningWorkout())
      navigate("/runningWorkout")
    }
  }

  // if no running workout, show list of available workouts
  if (!runningWorkout) {
    return (
      <AvailableWorkouts />
    )
  }

  // if no exercise is active in the workout
  // show a summary of the workout
  return (
    <div>
      <h1>{runningWorkout.name}</h1>
      {!runningWorkout.activeExerciseGroup
        ? <RunningWorkoutSummary />
        : <ActiveExerciseGroup
          exerciseGroup={runningWorkout.exerciseGroups
            .find(group => group.key === runningWorkout.activeExerciseGroup.key)}
        />
      }
      <button type="button" onClick={cancelWorkout}>Cancel workout</button>
    </div>
  )
}

export default RunningWorkout;