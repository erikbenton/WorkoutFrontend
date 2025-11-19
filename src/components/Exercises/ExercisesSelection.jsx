import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExerciseToSelection, cancelExerciseSelection, removeExerciseFromSelection, setSelectingExercises } from "../../reducers/exerciseSelection";

const ExercisesSelection = ({ maxSelection }) => {
  const { data: exercises, loading } = useFetch('exercises');
  const dispatch = useDispatch();
  const exerciseSelection = useSelector(state => state.exerciseSelection);

  useEffect(() => {
    if (maxSelection && exerciseSelection.exercisesSelected.length >= maxSelection) {
      dispatch(setSelectingExercises({ selectingExercises: false }));
    }
  }, [maxSelection, dispatch, exerciseSelection])

  const setSelection = (e, exercise) => {
    const { checked } = e.target
    if (checked) {
      dispatch(addExerciseToSelection({ exercise }));
    } else {
      dispatch(removeExerciseFromSelection({ exercise }));
    }
  }

  const cancelSelection = () => {
    dispatch(cancelExerciseSelection());
  }

  const doneSelecting = () => {
    dispatch(setSelectingExercises({ selectingExercises: false }))
  }

  if (loading) return <h2>Loading exercises...</h2>

  return (
    <div className="container">
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
        <Button className="col-auto me-2" type="button" onClick={doneSelecting}>Done</Button>
        <Button className="col-auto ms-2" type="button" variant="warning" onClick={cancelSelection}>Cancel</Button>
      </div>
    </div>
  )
}

export default ExercisesSelection;