import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  updateExerciseGroup,
  addExerciseSet,
  selectActiveExerciseGroup,
  updateActiveExerciseGroupExercise
} from "../../reducers/runningWorkout";
import ActiveExerciseSet from "./ActiveExerciseSet";
import { useEffect } from "react";
import ReplaceExercise from "../Exercises/ReplaceExercise";
import { Button } from "react-bootstrap";
import { cancelExerciseSelection } from "../../reducers/exerciseSelection";
import { saveCompleteWorkout } from "../../reducers/runningWorkout";
import { useNavigate } from "react-router-dom";

const ActiveExerciseGroup = ({
  exerciseGroup,
  index,
  maxIndex }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const exerciseSelection = useSelector(state => state.exerciseSelection);
  const runningWorkout = useSelector(state => state.runningWorkout);
  let workoutIsFinished = false;

  useEffect(() => {
    if (!exerciseSelection.selectingExercises && exerciseSelection.exercisesSelected.length > 0) {
      const exercisesToAdd = [...exerciseSelection.exercisesSelected]
      dispatch(updateExerciseGroup({
        groupKey: exerciseGroup.key,
        field: "exercise",
        value: exercisesToAdd[0]
      }));
      dispatch(updateActiveExerciseGroupExercise(exercisesToAdd[0]))
      dispatch(cancelExerciseSelection());
    }
  }, [dispatch, exerciseSelection, exerciseGroup])

  const updateGroup = (e) => {
    const [field] = e.target.id.split("_");
    const value = e.target.value;
    dispatch(updateExerciseGroup({
      groupKey: exerciseGroup.key,
      field,
      value
    }))
  }

  const addSet = () => {
    dispatch(addExerciseSet({ groupKey: exerciseGroup.key }))
  }

  const shiftActiveExercise = shift => {
    dispatch(selectActiveExerciseGroup(index + shift))
  }

  const completeWorkout = async () => {
    try {
      const savedCompletedWorkout = await dispatch(saveCompleteWorkout(runningWorkout));
      navigate(`/completedWorkouts/${savedCompletedWorkout.id}`);
    } catch (e) {
      console.error(e);
    }
  }

  if (index === maxIndex) {
    workoutIsFinished = exerciseGroup.exerciseSets
      .reduce((any, set) => any && set.completed, true)
  }

  if (exerciseSelection.selectingExercises) return (
    <ReplaceExercise />
  )

  return (
    <div>
      <div className="row my-2">
        <h2 className="col-auto m-0">
          <Link to={`/exercises/${exerciseGroup.exercise.id}`}>
            {exerciseGroup.exercise.name}
          </Link>
        </h2>
      </div>
      <div className="row">
        {exerciseGroup.note && <p>{exerciseGroup.note}</p>}
      </div>
      <div className="row row-cols-auto mb-2 align-items-center">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            id={`comment_${exerciseGroup.key}`}
            value={exerciseGroup.comment ?? ""}
            placeholder="Comment..."
            onChange={(e) => updateGroup(e)}
          />
        </div>
      </div>
      {exerciseGroup.exerciseSets.length > 0 &&
        <div className="row row-cols-auto mx-1 mb-1 mt-3 justify-content-center align-items-center text-center">
          <span className="col-3">Reps</span>
          <span className="col-5">Weight</span>
          <span className="col-4"></span>
        </div>
      }
      {exerciseGroup.exerciseSets.map(set => (
        <ActiveExerciseSet key={set.key} groupKey={exerciseGroup.key} restTime={exerciseGroup.restTime} set={set} />
      ))}
      <div className="row justify-content-center">
        <Button className="col-3 mt-2" type="button" onClick={addSet}>Add Set</Button>
      </div>
      <div className="row justify-content-center my-3">
        <Button
          className="col-4 col-md-2 text-nowrap me-1"
          disabled={index === 0}
          variant="outline-primary"
          type="button"
          onClick={() => shiftActiveExercise(-1)}
        >
          Prev Exercise
        </Button>
        <Button
          className="col-4 col-md-2 text-nowrap ms-1"
          disabled={index === maxIndex}
          type="button"
          onClick={() => shiftActiveExercise(1)}
        >
          Next Exercise
        </Button>
        {workoutIsFinished &&
          <Button
            className="col-4 col-md-2 text-nowrap mt-2"
            variant="success"
            type="button"
            onClick={completeWorkout}
          >
            Finish Workout
          </Button>
        }
      </div>
    </div>
  )
}

export default ActiveExerciseGroup;