import { useDispatch, useSelector } from "react-redux"
import { addExerciseGroup, addMultipleExerciseGroups, setWorkout, updateWorkoutName } from "../../reducers/focusedWorkout"
import { useEffect, useState } from "react"
import ExerciseGroupsInput from "./ExerciseGroupsInputs"
import { useNavigate, useParams } from "react-router-dom"
import workoutService from '../../services/workout'
import { addWorkout } from "../../reducers/workouts"
import useFetch from "../../hooks/useFetch"
import ExercisesSelection from "../Exercises/ExercisesSelection";

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
      dispatch(addWorkout({ id: savedWorkout.id, name: savedWorkout.name }))
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
    <form id="workout_form" onSubmit={id ? updateEditedWorkout : createNewWorkout}>
      <label>Name
        <input id="workout_name" type='text' value={workout.name ?? ""} onChange={(e) => dispatch(updateWorkoutName({ ...workout, name: e.target.value }))} />
      </label>
      <br />
      <ExerciseGroupsInput exerciseGroups={workout.exerciseGroups} exercises={exercises} />
      <br />
      <button type="button" onClick={() => dispatch(addExerciseGroup(exercises[0]))}>Add exercise</button>
      <button type="button" onClick={() => setSelectingExercises(true)}>Add multiple exercises</button>
      <br />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default WorkoutForm