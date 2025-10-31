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
    <>
      <label>Exercise
        <select
          id={`exercise_${exerciseGroup.key}`}
          value={exercise.id}
          onChange={(e) => selectExercise(e)}
        >
          {exercises.map(e => (
            <option key={e.id} value={e.id}>{e.name}</option>)
          )}
        </select>
      </label>
      <label>
        Note
        <input
          type='text'
          id={`note_${exerciseGroup.key}`}
          value={exerciseGroup.note ?? ''}
          onChange={updateExerciseGroupNote}
        />
      </label>
      <ExerciseGroupOptions exerciseGroup={exerciseGroup} />
      <br />
      <ExerciseSetsInput exerciseGroup={exerciseGroup} />
      <br />
      <Button type="button" onClick={addNewExerciseSet}>Add Set</Button>
      <br />
    </>
  )
}

const ExerciseGroupsInput = ({ exerciseGroups, exercises }) => {
  return (
    <>
      {exerciseGroups.map(group => (
        <ExerciseGroupInput
          key={group.key}
          exerciseGroup={group}
          exercises={exercises}
        />
      ))}
    </>
  )
}

export default ExerciseGroupsInput