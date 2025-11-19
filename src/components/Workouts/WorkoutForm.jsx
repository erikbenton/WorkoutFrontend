import { useDispatch, useSelector } from "react-redux";
import { addMultipleExerciseGroups, replaceExerciseGroupExercise, setWorkout, updateWorkoutDescription, updateWorkoutName } from "../../reducers/focusedWorkout";
import { useEffect, useState } from "react";
import ExerciseGroupsInput from "./ExerciseGroupsInputs";
import { Link, useNavigate, useParams } from "react-router-dom";
import workoutService from "../../services/workout";
import ExercisesSelection from "../Exercises/ExercisesSelection";
import { Button } from "react-bootstrap";
import RestTimeModal from "./RestTimeModal";
import ReplaceExercise from "../Exercises/ReplaceExercise";
import { cancelExerciseSelection, setSelectingExercises } from "../../reducers/exerciseSelection";

const WorkoutForm = (props) => {
  const [replacementExerciseGroup, setReplacementExerciseGroup] = useState(null);
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const workout = useSelector(state => state.focusedWorkout);
  const exerciseSelection = useSelector(state => state.exerciseSelection);
  const dispatch = useDispatch();

  useEffect(() => {
    const intitialWorkout = props.workout
      ? props.workout
      : { name: null, exerciseGroups: [] }
    dispatch(setWorkout(intitialWorkout))
  }, [dispatch, props])

  useEffect(() => {
    if (!exerciseSelection.selectingExercises
      && exerciseSelection.exercisesSelected.length > 0) {

      const exercisesToAdd = [...exerciseSelection.exercisesSelected];

      if (replacementExerciseGroup) {
        dispatch(replaceExerciseGroupExercise({
          groupKey: replacementExerciseGroup.key,
          replacementExercise: exercisesToAdd[0]
        }));
        setReplacementExerciseGroup(null);

      } else {
        dispatch(addMultipleExerciseGroups(exercisesToAdd));
      }

      dispatch(cancelExerciseSelection());
    }
  }, [dispatch, exerciseSelection, replacementExerciseGroup]);

  const createNewWorkout = async (e) => {
    e.preventDefault()

    try {
      const savedWorkout = await workoutService.create(workout)
      navigate(`/workouts/${savedWorkout.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const updateEditedWorkout = async (e) => {
    e.preventDefault()

    try {
      const savedWorkout = await workoutService.update(workout)
      navigate(`/workouts/${savedWorkout.id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const startExerciseSelection = () => {
    dispatch(setSelectingExercises({ selectingExercises: true }));
  }

  if (!workout) {
    return <div>Loading data...</div>
  }

  if (exerciseSelection.selectingExercises && replacementExerciseGroup) {
    return (
      <ReplaceExercise />
    )
  }

  if (exerciseSelection.selectingExercises) return (
    <ExercisesSelection />
  )

  const editingExerciseGroup = workout.editingGroupKey
    ? workout.exerciseGroups.find(group => workout.editingGroupKey === group.key)
    : null;

  return (
    <div className="container">
      {workout.openRestTimeModal && <RestTimeModal show={workout.openRestTimeModal} exerciseGroup={editingExerciseGroup} />}
      <div className="justify-content-center">
        <h1>{id ? "Edit" : "Create"} Workout</h1>
        <form id="workout_form" onSubmit={id ? updateEditedWorkout : createNewWorkout}>
          <div className="row g-3 align-items-center mb-2">
            <div className="col-auto">
              <label className="col-form-label fw-semibold fs-5">Name</label>
            </div>
            <div className="col">
              <input
                id="workoutName"
                className="form-control"
                type="text"
                value={workout.name ?? ""}
                onChange={(e) => dispatch(updateWorkoutName({ ...workout, name: e.target.value }))}
              />
            </div>
          </div>
          <div className="row">
            <div className="col mb-2">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Describe the workout..."
                id={`description_${workout.key}`}
                value={workout.description ?? ''}
                onChange={(e) => dispatch(updateWorkoutDescription({ ...workout, description: e.target.value }))}
              />
            </div>
          </div>
          <ExerciseGroupsInput
            exerciseGroups={workout.exerciseGroups}
            setReplacementExerciseGroup={setReplacementExerciseGroup}
          />
          <div className="row justify-content-center">
            <Button className="col-auto mb-2" type="button" onClick={startExerciseSelection}>Add exercises</Button>
          </div>
          <Button variant="success" type="submit">{id ? "Update" : "Create"}</Button>
          <Link to={id ? `/workouts/${id}` : "/workouts"}>
            <Button variant="warning" type="button">
              Cancel
            </Button>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default WorkoutForm;