import { useDispatch, useSelector } from "react-redux";
import { addMultipleExerciseGroups, replaceExerciseGroupExercise, setWorkout, updateWorkoutName } from "../../reducers/focusedWorkout";
import { useEffect, useState } from "react";
import ExerciseGroupsInput from "./ExerciseGroupsInputs";
import { Link, useNavigate, useParams } from "react-router-dom";
import workoutService from "../../services/workout";
import ExercisesSelection from "../Exercises/ExercisesSelection";
import { Button } from "react-bootstrap";
import RestTimeModal from "./RestTimeModal";
import ReplaceExercise from "../Exercises/ReplaceExercise";

const WorkoutForm = (props) => {
  const [selectingExercises, setSelectingExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [replacementExerciseGroup, setReplacementExerciseGroup] = useState(null);
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const workout = useSelector(state => state.focusedWorkout);
  const dispatch = useDispatch();

  useEffect(() => {
    const intitialWorkout = props.workout
      ? props.workout
      : { name: null, exerciseGroups: [] }
    dispatch(setWorkout(intitialWorkout))
  }, [dispatch, props])

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0 && replacementExerciseGroup) {
      const exercisesToAdd = [...selectedExercises];
      dispatch(replaceExerciseGroupExercise({
        groupKey: replacementExerciseGroup.key,
        replacementExercise: exercisesToAdd[0]
      }));
      setReplacementExerciseGroup(null);
      setSelectedExercises([])
    }
  }, [dispatch, selectingExercises, selectedExercises, replacementExerciseGroup])

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0 && !replacementExerciseGroup) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises, replacementExerciseGroup])

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

  if (!workout) {
    return <div>Loading data...</div>
  }

  if (selectingExercises && replacementExerciseGroup) {
    return (
      <ReplaceExercise
        selectedExercises={selectedExercises}
        setSelectedExercises={setSelectedExercises}
        setSelectingExercises={setSelectingExercises} />
    )
  }

  if (selectingExercises) return (
    <ExercisesSelection
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises} />
  )

  const editingExerciseGroup = workout.editingGroupKey
    ? workout.exerciseGroups.find(group => workout.editingGroupKey === group.key)
    : null;

  return (
    <div>
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
          <ExerciseGroupsInput
            exerciseGroups={workout.exerciseGroups}
            setReplacementExerciseGroup={setReplacementExerciseGroup}
            setSelectingExercises={setSelectingExercises}
          />
          <div className="row justify-content-center">
            <Button className="col-auto mb-2" type="button" onClick={() => setSelectingExercises(true)}>Add exercises</Button>
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