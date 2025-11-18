import { useDispatch, useSelector } from "react-redux";
import { selectActiveExerciseGroup, addMultipleExerciseGroups } from "../../reducers/runningWorkout";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import ExercisesSelection from "../Exercises/ExercisesSelection";
import ActiveGroupOptions from "./ActiveGroupOptions";
import { Button } from "react-bootstrap";
import { cancelExerciseSelection, setSelectingExercises } from "../../reducers/exerciseSelection";

const RunningWorkoutSummary = () => {
  const runningWorkout = useSelector(state => state.runningWorkout);
  const exerciseSelection = useSelector(state => state.exerciseSelection);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!exerciseSelection.selectingExercises && exerciseSelection.exercisesSelected.length > 0) {
      const exercisesToAdd = [...exerciseSelection.exercisesSelected];
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      dispatch(cancelExerciseSelection());
    }
  }, [dispatch, exerciseSelection])

  const selectExerciseGroup = (index) => {
    dispatch(selectActiveExerciseGroup(index))
  }

  const startSelectingExercises = () => {
    dispatch(setSelectingExercises({ selectingExercises: true }));
  }

  if (exerciseSelection.selectingExercises) return (
    <ExercisesSelection />
  )

  return (
    <div>
      <ol className="no-bullets">
        {runningWorkout.exerciseGroups.map((group, index) => (
          <li key={group.key}>
            <div className="card mb-1">
              <div className="card-body px-2 py-1">
                <div className="row align-items-center">
                  <Link className="col-auto" onClick={() => selectExerciseGroup(index)}>
                    {group.exercise.name} - {group.exerciseSets.length} sets
                  </Link>
                  <div className="ms-auto col-auto">
                    <ActiveGroupOptions key={group.key} exerciseGroup={group} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="row justify-content-center mb-2">
        <Button className="col-auto" type="button" onClick={startSelectingExercises}>Add exercises</Button>
      </div>
    </div>
  )
}

export default RunningWorkoutSummary;