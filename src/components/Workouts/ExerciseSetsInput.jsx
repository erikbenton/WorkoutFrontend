import { Button } from "react-bootstrap"
import { removeExerciseSet, updateExerciseSet } from "../../reducers/focusedWorkout"
import { useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import setTypes, { setTypeColor } from "../../utils/setTypes";

const ExerciseSetInput = ({ exerciseSet, exerciseGroupKey }) => {
  const dispatch = useDispatch()

  const updateExerciseSetMinReps = (e) => {
    const minReps = e.target.value === "" ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        minReps
      }
    }))
  }

  const updateExerciseSetMaxReps = (e) => {
    const maxReps = e.target.value === "" ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        maxReps
      }
    }))
  }

  const updateExerciseSetType = (e) => {
    const setType = e.target.value === "" ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        setType
      }
    }))
  }

  const removeSet = () => {
    dispatch(removeExerciseSet({
      exerciseGroupKey,
      exerciseSet
    }))
  }

  return (
    <div className="row row-cols-auto m-1 justify-content-center align-items-center">
      <div className="col-3 ps-0 ps-md-2">
        <input
          type="number"
          className="form-control text-center"
          id={`minReps_${exerciseSet.key}`}
          value={exerciseSet.minReps ?? ""}
          onChange={updateExerciseSetMinReps}
        />
      </div>
      <div className="col-3 ps-0">
        <input
          type="number"
          className="form-control text-center"
          id={`maxReps_${exerciseSet.key}`}
          value={exerciseSet.maxReps ?? ""}
          onChange={updateExerciseSetMaxReps}
        />
      </div>
      <div className="col-4 px-0">
        <select
          value={exerciseSet.setType ?? ""}
          className="form-select no-caret px-1 text-center"
          style={{ color: setTypeColor(exerciseSet) }}
          onChange={updateExerciseSetType}>
          {Object.keys(setTypes).map(setType => (
            <option
              key={setTypes[setType].type}
              style={{ color: setTypes[setType].color }}
              value={setTypes[setType].type}
            >
              {setTypes[setType].type}
            </option>
          ))}
        </select>
      </div>
      <div className="col-2 p-0 text-center">
        <Button variant="danger" type="button" onClick={removeSet}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  )
}

const ExerciseSetsInput = ({ exerciseGroup }) => {
  return (
    <div>
      {exerciseGroup.exerciseSets.length > 0 &&
        <div className="row row-cols-auto m-1 text-center align-items-center">
          <span className="col-3 ps-0 ps-md-2">Min Reps</span>
          <span className="col-3 ps-0">Max Reps</span>
          <span className="col-4 px-0">Type</span>
          <span className="col-2 col-sm-4"></span>
        </div>
      }
      {exerciseGroup.exerciseSets.map(set =>
        <ExerciseSetInput key={set.key} exerciseSet={set} exerciseGroupKey={exerciseGroup.key} />)}
    </div>
  )
}

export default ExerciseSetsInput