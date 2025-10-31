import { useState } from "react"
import { useSelector } from "react-redux"
import exerciseService from "../../services/exercise"
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ExerciseForm = (props) => {
  const navigate = useNavigate()
  const bodyParts = useSelector(state => state.bodyParts)
  const equipments = useSelector(state => state.equipment)
  const initialExercise = props.exercise
    ? props.exercise
    : { name: '', bodyPart: bodyParts[0].bodyPart, equipment: equipments[0].equipment, instructions: null }
  const [exercise, setExercise] = useState(initialExercise)

  const setExerciseName = (e) => {
    const name = e.target.value
    setExercise({
      ...exercise,
      name
    })
  }

  const selectBodyPart = (e) => {
    const selectedBodyPart = e.target.value
    setExercise({
      ...exercise,
      bodyPart: selectedBodyPart
    })
  }

  const selectEquipment = (e) => {
    const selectedEquipment = e.target.value
    setExercise({
      ...exercise,
      equipment: selectedEquipment
    })
  }

  const setExerciseIntructions = (e) => {
    const instructions = e.target.value
    setExercise({
      ...exercise,
      instructions: instructions === '' ? null : instructions
    })
  }

  const saveExercise = async (e) => {
    e.preventDefault()

    if (props.exercise) {
      const updatedExercise = await exerciseService.update(exercise)
      navigate(`/exercises/${updatedExercise.id}`)
    } else {
      const newExercise = await exerciseService.create(exercise)
      navigate(`/exercises/${newExercise.id}`)
    }
  }

  return (
    <>
      <h1>{props.exercise ? 'Edit' : 'Create'} Exercise</h1>
      <form onSubmit={saveExercise}>
        <label>Name
          <input
            id={`name_${exercise.id}`}
            type="text"
            value={exercise.name}
            onChange={setExerciseName}
          />
        </label>
        <br />
        <label>Body Part
          <select
            id={`bodyPart_${exercise.id}`}
            value={exercise.bodyPart}
            onChange={selectBodyPart}
          >
            {bodyParts.map(bp => (
              <option key={bp.bodyPart} value={bp.bodyPart}>{bp.bodyPart}</option>
            ))}
          </select>
        </label>
        <br />
        <label>Equipment
          <select
            id={`equipment_${exercise.id}`}
            value={exercise.equipment}
            onChange={selectEquipment}
          >
            {equipments.map(eq => (
              <option key={eq.equipment} value={eq.equipment}>{eq.equipment}</option>
            ))}
          </select>
        </label>
        <br />
        <label>Instructions
          <textarea
            id={`instructions_${exercise.id}`}
            value={exercise.instructions ?? ''}
            onChange={setExerciseIntructions}
          />
        </label>
        <br />
        <Button variant="success" type="submit">{props.exercise ? 'Update' : 'Create'}</Button>
        <Button variant="warning" type="button">
          <Link to={props.exercise ? `/exercises/${props.exercise.id}` : "/exercises"}>
            Cancel
          </Link>
        </Button>
      </form>
    </>
  )
}

export default ExerciseForm