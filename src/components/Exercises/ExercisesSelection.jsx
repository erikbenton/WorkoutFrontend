import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";

const ExercisesSelection = ({ setSelectingExercises, setSelectedExercises, selectedExercises, maxSelection }) => {
  const { data: exercises, loading } = useFetch('exercises');

  useEffect(() => {
    if (maxSelection && selectedExercises.length >= maxSelection) {
      setSelectingExercises(false);
    }
  }, [maxSelection, selectedExercises, setSelectingExercises])

  const setSelection = (e, exercise) => {
    const { checked } = e.target
    if (checked) {
      setSelectedExercises(curr => curr.concat(exercise))
    } else {
      setSelectedExercises(curr => curr.filter(ex => ex.id !== exercise.id))
    }
  }

  const cancelSelection = () => {
    setSelectedExercises([]);
    setSelectingExercises(false);
  }

  if (loading) return <h2>Loading exercises...</h2>

  return (
    <div>
      <ul>
        {exercises.map(exercise => (
          <li key={exercise.id}>
            {exercise.name}
            <input type="checkbox" onChange={(e) => setSelection(e, exercise)} />
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => setSelectingExercises(false)}>Done</Button>
      <Button type="button" variant="warning" onClick={cancelSelection}>Cancel</Button>
    </div>
  )
}

export default ExercisesSelection;