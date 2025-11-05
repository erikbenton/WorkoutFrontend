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
        <div className="my-2 pe-2 row row-cols-auto align-items-center">
          <label className="col-3 col-md-2">Name</label>
          <div className="col-9">
            <input
              className="form-control"
              id={`name_${exercise.id}`}
              type="text"
              value={exercise.name}
              onChange={setExerciseName}
            />
          </div>
        </div>
        <div className="my-2 pe-2 row row-cols-auto align-items-center">
          <label className="col-3 col-md-2">Body Part</label>
          <div className="col-auto">
            <select
              className="form-select"
              id={`bodyPart_${exercise.id}`}
              value={exercise.bodyPart}
              onChange={selectBodyPart}
            >
              {bodyParts.map(bp => (
                <option key={bp.bodyPart} value={bp.bodyPart}>{bp.bodyPart}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-2 pe-2 row row-cols-auto align-items-center">
          <label className="col-3 col-md-2">Equipment</label>
          <div className="col-auto">
            <select
              className="form-select"
              id={`equipment_${exercise.id}`}
              value={exercise.equipment}
              onChange={selectEquipment}
            >
              {equipments.map(eq => (
                <option key={eq.equipment} value={eq.equipment}>{eq.equipment}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="my-2 pe-2 row align-items-center">
          <label className="col-3 col-md-2">Instructions</label>
          <div className="col">
            <textarea
              className="form-control"
              rows="3"
              id={`instructions_${exercise.id}`}
              value={exercise.instructions ?? ''}
              onChange={setExerciseIntructions}
            />
          </div>
        </div>
        <Button variant="success" type="submit">{props.exercise ? 'Update' : 'Create'}</Button>
        <Link to={props.exercise ? `/exercises/${props.exercise.id}` : "/exercises"}>
          <Button variant="warning" type="button">
            Cancel
          </Button>
        </Link>
      </form >
    </>
  )
}

export default ExerciseForm