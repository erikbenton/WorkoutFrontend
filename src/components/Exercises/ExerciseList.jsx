import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

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
  const bodyParts = useSelector(state => state.bodyParts);
  const equipments = useSelector(state => state.equipment);
  const [nameFilter, setNameFilter] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState("");
  const [equipmentFilter, setEquipmentFilter] = useState("");
  const { data: exercises, loading, error } = useFetch("exercises");
  const navigate = useNavigate()

  if (loading) return <div>Loading data...</div>
  if (error) return <di>{error}</di>

  const filteredExercises = exercises
    .filter(ex => {
      return ex.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        ex.bodyPart.toLowerCase().includes(bodyPartFilter.toLowerCase()) &&
        ex.equipment.toLowerCase().includes(equipmentFilter.toLowerCase())
    });

  return (
    <div>
      <h2>Exercises</h2>
      <div className="container-flex">

        <Table striped className="table-sm">
          <thead>
            <tr>
              <th>Name
                <input
                  className="form-control"
                  id="exercise_name_filter"
                  type="text"
                  placeholder="filter by name"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)} />
              </th>
              <th>Body Part
                <select
                  className="form-select"
                  id="bodyPartFilter"
                  value={bodyPartFilter}
                  onChange={(e) => setBodyPartFilter(e.target.value)}
                >
                  <option value=""></option>
                  {bodyParts.map(bp => (
                    <option key={bp.bodyPart} value={bp.bodyPart}>{bp.bodyPart}</option>
                  ))}
                </select>
              </th>
              <th>Equipment
                <select
                  className="form-select"
                  id="equipmentFilter"
                  value={equipmentFilter}
                  onChange={(e) => setEquipmentFilter(e.target.value)}
                >
                  <option value=""></option>
                  {equipments.map(eq => (
                    <option key={eq.equipment} value={eq.equipment}>{eq.equipment}</option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredExercises.map(exercise => (
              <ExerciseListRow key={exercise.id} exercise={exercise} />
            ))}
          </tbody>
        </Table>
      </div>
      <Button type="button" onClick={() => navigate("/exercises/create")}>Create Exercise</Button>
    </div>
  )
}

export default ExerciseList