import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeExercises } from '../../reducers/exercises'
import { Button, Table } from 'react-bootstrap'

const ExerciseListRow = ({ exercise }) => {
  return (
    <tr>
      <td><Link to={`/exercises/${exercise.id}`}>{exercise.name}</Link></td>
      <td>{exercise.bodyPart}</td>
      <td>{exercise.equipment}</td>
    </tr>
  )
}

const ExerciseList = () => {
  const [nameFilter, setNameFilter] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState("");
  const exercises = useSelector(state => state.exercises)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializeExercises())
  }, [dispatch])

  if (!exercises) {
    return <div>Loading data...</div>
  }

  const filteredExercises = exercises
    .filter(ex => {
      return ex.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        ex.bodyPart.toLowerCase().includes(bodyPartFilter.toLowerCase()) &&
        ex.equipment.toLowerCase().includes(equipmentFilter.toLowerCase())
    });

  return (
    <div>
      <h2>Exercises</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name
              <input
                id="exercise_name_filter"
                type="text"
                placeholder="filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)} />
            </th>
            <th>Body Part
              <input
                id="exercise_bodyParts_filter"
                type="text"
                placeholder="filter by body part"
                value={bodyPartFilter}
                onChange={(e) => setBodyPartFilter(e.target.value)} />
            </th>
            <th>Equipment
              <input
                id="exercise_equipment_filter"
                type="text"
                placeholder="filter by equipment"
                value={equipmentFilter}
                onChange={(e) => setEquipmentFilter(e.target.value)} />
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredExercises.map(exercise => (
            <ExerciseListRow key={exercise.id} exercise={exercise} />
          ))}
        </tbody>
      </Table>
      <Button type="button" onClick={() => navigate("/exercises/create")}>Create Exercise</Button>
    </div>
  )
}

export default ExerciseList