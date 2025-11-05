import { updateExerciseGroup, addExerciseSet } from '../../reducers/focusedWorkout'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import ExerciseSetsInput from './ExerciseSetsInput'
import { Button } from 'react-bootstrap'
import ExerciseGroupOptions from './ExerciseGroupOptions';

const ExerciseGroupInput = ({ exerciseGroup, exercises }) => {
  const dispatch = useDispatch()
  const [exercise, setExercise] = useState(exerciseGroup.exercise ?? exercises[0])

  const selectExercise = (e) => {
    const selectedExercise = exercises.find(ex => ex.id === Number(e.target.value))
    setExercise(selectedExercise)
    dispatch(updateExerciseGroup({
      exerciseGroup: {
        ...exerciseGroup,
        exercise: { ...selectedExercise }
      }
    }))
  }

  const addNewExerciseSet = () => {
    dispatch(addExerciseSet(exerciseGroup))
  }

  const updateExerciseGroupNote = (e) => {
    const note = e.target.value === '' ? null : e.target.value
    dispatch(updateExerciseGroup({
      exerciseGroup: {
        ...exerciseGroup,
        note
      }
    }))
  }

  return (
    <div className="col-12 card mb-2 pb-1">
      <div className="card-text my-2 pe-2 row row-cols-auto justify-content-center align-items-center">
        <label className="ps-4 col-auto">Exercise</label>
        <div className="col-md-3">
          <select
            id={`exercise_${exerciseGroup.key}`}
            className="form-select"
            value={exercise.id}
            onChange={(e) => selectExercise(e)}
          >
            {exercises.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>)
            )}
          </select>
        </div>
        <div className="col col-md-5 col-lg-6">
          <input
            type='text'
            className="form-control"
            placeholder="Note"
            id={`note_${exerciseGroup.key}`}
            value={exerciseGroup.note ?? ''}
            onChange={updateExerciseGroupNote}
          />
        </div>
        <div className="col ms-lg-auto">
          <ExerciseGroupOptions exerciseGroup={exerciseGroup} />
        </div>
      </div>
      <ExerciseSetsInput exerciseGroup={exerciseGroup} />
      <div className="row justify-content-center">
        <div className="col-4">
          <Button className="w-100" type="button" onClick={addNewExerciseSet}>Add Set</Button>
        </div>
      </div>
    </div>
  )
}

const ExerciseGroupsInput = ({ exerciseGroups, exercises }) => {
  return (
    <div>
      {exerciseGroups.map(group => (
        <ExerciseGroupInput
          key={group.key}
          exerciseGroup={group}
          exercises={exercises}
        />
      ))}
    </div>
  )
}

export default ExerciseGroupsInput