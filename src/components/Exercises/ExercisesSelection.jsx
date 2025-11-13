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
      <ul className="no-bullets">
        {exercises.map(exercise => (
          <li key={exercise.id}>
            <div className="card my-2 p-2 col-md-8 col-lg-5">
              <div className="card-body p-0">
                <div className="row row-cols-auto">
                  <span className="col-auto">{exercise.name}</span>
                  <div className="row ms-auto me-2">
                    <input className="col-auto ms-auto" type="checkbox" onChange={(e) => setSelection(e, exercise)} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="row row-cols-auto justify-content-center mb-2">
        <Button className="col-auto" type="button" onClick={() => setSelectingExercises(false)}>Done</Button>
        <Button className="col-auto" type="button" variant="warning" onClick={cancelSelection}>Cancel</Button>
      </div>
    </div>
  )
}

export default ExercisesSelection;