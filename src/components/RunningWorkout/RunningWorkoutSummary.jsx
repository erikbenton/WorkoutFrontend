import { useDispatch, useSelector } from "react-redux";
import { selectActiveExerciseGroup, addMultipleExerciseGroups } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ExercisesSelection from "../Exercises/ExercisesSelection";
import ActiveGroupOptions from "./ActiveGroupOptions";
import { Button } from "react-bootstrap";

const RunningWorkoutSummary = ({
  selectingExercises,
  setSelectingExercises,
  selectedExercises,
  setSelectedExercises }) => {
  const runningWorkout = useSelector(state => state.runningWorkout)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises, setSelectedExercises])

  const selectExerciseGroup = (index) => {
    dispatch(selectActiveExerciseGroup(index))
  }

  if (selectingExercises) return (
    <ExercisesSelection
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises} />
  )

  return (
    <div>
      <ol className="no-bullets">
        {runningWorkout.exerciseGroups.map((group, index) => (
          <li key={group.key}>
            <div className="card p-2 mb-1">
              <div className="row align-items-center">
                <Link className="col-auto" onClick={() => selectExerciseGroup(index)}>
                  {group.exercise.name} - {group.exerciseSets.length} sets
                </Link>
                <div className="ms-auto col-auto">
                  <ActiveGroupOptions key={group.key} exerciseGroup={group} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="row justify-content-center mb-2">
        <Button className="col-auto" type="button" onClick={() => setSelectingExercises(true)}>Add exercises</Button>
      </div>
    </div>
  )
}

export default RunningWorkoutSummary;