import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from "react-router-dom"
import { getWorkoutDetails } from '../../reducers/focusedWorkout'
import { deleteWorkout } from "../../reducers/workouts"

const WorkoutDetails = () => {
  const id = Number(useParams().id)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const workout = useSelector(state => state.focusedWorkout)

  useEffect(() => {
    dispatch(getWorkoutDetails(id))
  }, [dispatch, id])

  const navigateToEditWorkoutForm = () => {
    navigate(`/workouts/edit/${workout.id}`)
  }

    const removeWorkout = (workout) => {
    const response = confirm(`Delete workout ${workout.name}?`)
    if (response) {
      dispatch(deleteWorkout(workout))
      navigate('/workouts')
    }
  }

  if (!workout.id) {
    return (
      <div>
        Loading data...
      </div>
    )
  }

  const repsText = set =>
    `${set.minReps !== null ? set.minReps : ''}
    ${set.minReps && set.maxReps ? '-' : ''}
    ${set.maxReps !== null ? set.maxReps : ''}`

  const weightText = set => set.weight !== null ? `x ${set.weight} lbs` : 'reps'

  return (
    <>
      <h2>{workout.name}</h2>
      <ol>
        {workout.exerciseGroups.map(group =>
          <li key={group.key}>
            <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
            {group.note && <p>{group.note}</p>}
            <ol>
              {group.exerciseSets.map(set =>
                <li key={set.key}>
                  {repsText(set)} {weightText(set)}
                </li>)}
            </ol>
          </li>
        )}
      </ol>
      <button onClick={navigateToEditWorkoutForm}>Edit Workout</button>
      <button type="button" onClick={() => removeWorkout(workout)}>Delete?</button>
    </>
  )
}

export default WorkoutDetails