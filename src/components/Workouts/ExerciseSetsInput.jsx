import { Button } from 'react-bootstrap'
import { removeExerciseSet, updateExerciseSet } from '../../reducers/focusedWorkout'
import { useDispatch } from 'react-redux'

const ExerciseSetInput = ({ exerciseSet, exerciseGroupKey }) => {
  const dispatch = useDispatch()

  const updateExerciseSetMinReps = (e) => {
    const minReps = e.target.value === '' ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        minReps
      }
    }))
  }

  const updateExerciseSetMaxReps = (e) => {
    const maxReps = e.target.value === '' ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        maxReps
      }
    }))
  }

  const updateExerciseSetWeight = (e) => {
    const weight = e.target.value === '' ? null : e.target.value
    dispatch(updateExerciseSet({
      exerciseGroupKey,
      exerciseSet: {
        ...exerciseSet,
        weight
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
    <>
      <label>Min Reps
        <input type='number' id={`minReps_${exerciseSet.key}`} value={exerciseSet.minReps ?? ''} onChange={updateExerciseSetMinReps} />
      </label>
      <label>Max Reps
        <input type='number' id={`maxReps_${exerciseSet.key}`} value={exerciseSet.maxReps ?? ''} onChange={updateExerciseSetMaxReps} />
      </label>
      <label>Weight
        <input type='number' id={`weight_${exerciseSet.key}`} value={exerciseSet.weight ?? ''} onChange={updateExerciseSetWeight} />
      </label>
      <Button variant="danger" type="button" onClick={removeSet}>remove set</Button>
      <br />
    </>
  )
}

const ExerciseSetsInput = ({ exerciseGroup }) => {
  return (
    <>
      {exerciseGroup.exerciseSets.map(set =>
        <ExerciseSetInput key={set.key} exerciseSet={set} exerciseGroupKey={exerciseGroup.key} />)}
    </>
  )
}

export default ExerciseSetsInput