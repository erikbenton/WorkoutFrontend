import { useDispatch, useSelector } from "react-redux"
import { addExerciseGroup, addMultipleExerciseGroups, setWorkout, updateWorkoutName } from "../../reducers/focusedWorkout"
import { useEffect, useState } from "react"
import ExerciseGroupsInput from "./ExerciseGroupsInputs"
import { Link, useNavigate, useParams } from "react-router-dom"
import workoutService from '../../services/workout'
import useFetch from "../../hooks/useFetch"
import ExercisesSelection from "../Exercises/ExercisesSelection";
import { Button } from "react-bootstrap"

const WorkoutForm = (props) => {
  const [selectingExercises, setSelectingExercises] = useState(false);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const navigate = useNavigate()
  const id = Number(useParams().id)
  const workout = useSelector(state => state.focusedWorkout)
  const { data: exercises, loading: loadingExercises, error: errorExercises } = useFetch('exercises')
  const dispatch = useDispatch()

  useEffect(() => {
    const intitialWorkout = props.workout
      ? props.workout
      : { name: null, exerciseGroups: [] }
    dispatch(setWorkout(intitialWorkout))
  }, [dispatch, props])

  useEffect(() => {
    if (!selectingExercises && selectedExercises.length > 0) {
      const exercisesToAdd = [...selectedExercises]
      dispatch(addMultipleExerciseGroups(exercisesToAdd));
      setSelectedExercises([]);
    }
  }, [dispatch, selectingExercises, selectedExercises])

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

  if (errorExercises) return <h1>Exercise error</h1>

  if (!workout || loadingExercises) {
    return <div>Loading data...</div>
  }

  if (selectingExercises) return (
    <ExercisesSelection
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises} />
  )

  return (
    <div className="container justify-content-center">
      <div className="justify-content-center">
        <h1>{id ? 'Edit' : 'Create'} Workout</h1>
        <form id="workout_form" onSubmit={id ? updateEditedWorkout : createNewWorkout}>
          <div className="row g-3 align-items-center mb-2">
            <div className="col-auto">
              <label className="col-form-label">Name</label>
            </div>
            <div className="col-auto">
              <input
                id="workoutName"
                className="form-control"
                type='text'
                value={workout.name ?? ""}
                onChange={(e) => dispatch(updateWorkoutName({ ...workout, name: e.target.value }))}
              />
            </div>
          </div>
          <ExerciseGroupsInput exerciseGroups={workout.exerciseGroups} exercises={exercises} />
          <br />
          <Button variant="outline-primary" type="button" onClick={() => dispatch(addExerciseGroup(exercises[0]))}>Add exercise</Button>
          <Button type="button" onClick={() => setSelectingExercises(true)}>Add multiple exercises</Button>
          <br />
          <Button variant="success" type="submit">{id ? 'Update' : 'Create'}</Button>
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

export default WorkoutForm