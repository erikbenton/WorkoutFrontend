import { useDispatch, useSelector } from "react-redux"
import { addExerciseGroup, setWorkout, updateWorkoutName } from "../../reducers/focusedWorkout"
import { useEffect } from "react"
import ExerciseGroupsInput from "./ExerciseGroupsInputs"
import { useNavigate, useParams } from "react-router-dom"
import workoutService from '../../services/workout'
import { addWorkout } from "../../reducers/workouts"
import useFetch from "../../hooks/useFetch"

const WorkoutForm = (props) => {
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

  return (
    <form onSubmit={id ? updateEditedWorkout : createNewWorkout}>
      <label>Name
        <input type='text' value={workout.name ?? ""} onChange={(e) => dispatch(updateWorkoutName({ ...workout, name: e.target.value }))} />
      </label>
      <br />
      <ExerciseGroupsInput exerciseGroups={workout.exerciseGroups} exercises={exercises} />
      <br />
      <button type="button" onClick={() => dispatch(addExerciseGroup(exercises[0]))}>Add exercise group</button>
      <br />
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  )
}

export default WorkoutForm