import { updateExerciseGroup, addExerciseSet } from '../../reducers/focusedWorkout'
import { useDispatch } from 'react-redux'
import ExerciseSetsInput from './ExerciseSetsInput'
import { Button } from 'react-bootstrap'
import ExerciseGroupOptions from './ExerciseGroupOptions';

const ExerciseGroupInput = ({ exerciseGroup, setReplacementExerciseGroup, setSelectingExercises }) => {
  const dispatch = useDispatch()

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
      <div className="card-body pt-1">
        <div className="card-text my-2 pe-2 row row-cols-auto align-items-center">
          <div className="col-md-3">
            <h4 className="m-0">{exerciseGroup.exercise.name}</h4>
          </div>
          <div className="col ms-auto">
            <ExerciseGroupOptions
              exerciseGroup={exerciseGroup}
              setSelectingExercises={setSelectingExercises}
              setReplacementExerciseGroup={setReplacementExerciseGroup}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <textarea
              className="form-control"
              placeholder="Note"
              id={`note_${exerciseGroup.key}`}
              value={exerciseGroup.note ?? ''}
              onChange={updateExerciseGroupNote}
              rows={1}
            />
          </div>
        </div>
        <ExerciseSetsInput exerciseGroup={exerciseGroup} />
        <div className="row justify-content-center">
          <div className="col-4">
            <Button className="w-100 mt-3" type="button" onClick={addNewExerciseSet}>Add Set</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ExerciseGroupsInput = ({ exerciseGroups, exercises, setReplacementExerciseGroup, setSelectingExercises }) => {
  return (
    <div>
      {exerciseGroups.map(group => (
        <ExerciseGroupInput
          key={group.key}
          exerciseGroup={group}
          exercises={exercises}
          setReplacementExerciseGroup={setReplacementExerciseGroup}
          setSelectingExercises={setSelectingExercises}
        />
      ))}
    </div>
  )
}

export default ExerciseGroupsInput;