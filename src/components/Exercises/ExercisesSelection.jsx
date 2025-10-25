import useFetch from "../../hooks/useFetch";

const ExercisesSelection = ({ setSelectingExercises, setSelectedExercises }) => {
  const { data: exercises, loading } = useFetch('exercises');

  const setSelection = (e, exercise) => {
    const { checked } = e.target
    if (checked) {
      setSelectedExercises(curr => curr.concat(exercise))
    } else {
      setSelectedExercises(curr => curr.filter(ex => ex.id !== exercise.id))
    }
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
      <button type="button" onClick={() => setSelectingExercises(false)}>Done</button>
    </div>
  )
}

export default ExercisesSelection;