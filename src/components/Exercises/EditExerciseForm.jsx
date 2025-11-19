import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ExerciseForm from "./ExerciseForm";

const EditExerciseForm = () => {
  const id = Number(useParams().id)
  const { data: exercise, loading, error } = useFetch(`exercises/${id}`)

  if (loading) return <h1>Loading data...</h1>
  if (!exercise) return <h1>Cannot find exercise</h1>
  if (error) return <h1>{error}</h1>

  return (
    <div className="container">
      <ExerciseForm exercise={exercise} />
    </div>
  );
}

export default EditExerciseForm;