import { updateExerciseGroup, addExerciseSet, removeExerciseGroup, shiftExerciseGroup } from '../../reducers/focusedWorkout'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import ExerciseSetsInput from './ExerciseSetsInput'

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

  const removeGroup = () => {
    dispatch(removeExerciseGroup(exerciseGroup))
  }

  const shiftGroup = (shiftAmount) => {
    dispatch(shiftExerciseGroup({
      shiftAmount,
      exerciseGroup
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
      <button type="button" onClick={() => shiftGroup(-1)}>shift UP</button>
      <button type="button" onClick={() => shiftGroup(1)}>shift DOWN</button>
      <button type="button" onClick={removeGroup}>remove group</button>
      <br />
      <ExerciseSetsInput exerciseGroup={exerciseGroup} />
      <br />
      <button type="button" onClick={addNewExerciseSet}>Add Set</button>
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