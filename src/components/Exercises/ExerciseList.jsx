import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeExercises } from '../../reducers/exercises'

const ExerciseListRow = ({ exercise }) => {
  return (
    <tr>
      <td><Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link></td>
      <td>{exercise.bodyPart}</td>
      <td>{exercise.equipment}</td>
    </tr>
  )
}

const ExerciseList = () => {
  const exercises = useSelector(state => state.exercises)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeExercises())
  }, [dispatch])

  if (!exercises) {
    return <div>Loading data...</div>
  }

  return (
    <div>
      <h2>Exercises</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Body Part</th>
            <th>Equipment</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map(exercise => <ExerciseListRow key={exercise.id} exercise={exercise} />)}
        </tbody>
      </table>
      <button type="button" onClick={() => navigate("/exercises/create")}>Create Exercise</button>
    </div>
  )
}

export default ExerciseList