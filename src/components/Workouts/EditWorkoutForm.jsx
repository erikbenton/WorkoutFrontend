import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import WorkoutForm from "./WorkoutForm";


const EditWorkoutForm = () => {
  const id = Number(useParams().id)
  const { data: workout, loading, error } = useFetch(`workouts/${id}`)

  if (loading) return <h1>Loading data...</h1>
  if (!workout) return <h1>Cannot find workout</h1>
  if (error) return <h1>{error}</h1>

  return <WorkoutForm workout={workout} />
}

export default EditWorkoutForm