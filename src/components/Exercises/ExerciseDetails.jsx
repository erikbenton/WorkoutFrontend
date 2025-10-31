import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import exerciseService from '../../services/exercise'
import { Button } from 'react-bootstrap'

const ExerciseDetails = () => {
  const id = Number(useParams().id)
  const { data: exercise, loading, error } = useFetch(`exercises/${id}`)
  const navigate = useNavigate()

  const deleteExercise = async () => {
    const response = confirm(`Delete exercise '${exercise.name}'?`)
    if (response) {
      await exerciseService.remove(exercise)
      navigate("/exercises")
    }
  }

  if (loading) return <div>Loading data...</div>
  if (!exercise) return <div>Could not find exercise</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>{exercise.name}</h1>
      <section>Body Part: {exercise.bodyPart}</section>
      <section>Equipment: {exercise.equipment}</section>
      <section>Instructions: {exercise.instructions ?? 'No instructions'}</section>
      <Button variant="outline-primary"><Link to="/exercises">View all exercises</Link></Button>
      <Button variant="success" type="button" onClick={() => navigate(`/exercises/edit/${exercise.id}`)}>Edit</Button>
      <Button variant="danger" type="button" onClick={deleteExercise}>Delete?</Button>
    </div>
  )
}
export default ExerciseDetails