import { useParams, useNavigate, Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import exerciseService from '../../services/exercise'
import { Button } from 'react-bootstrap'
import ExerciseHistoryTabs from './ExerciseHistoryTabs'
import { useDispatch, useSelector } from 'react-redux'
import { MODAL_TYPES, setModal } from '../../reducers/modals'
import ConfirmModal from '../Modals/ConfirmModal'

const ExerciseDetails = () => {
  const id = Number(useParams().id)
  const { data: exercise, loading, error } = useFetch(`exercises/${id}`)
  const navigate = useNavigate();
  const modals = useSelector(state => state.modals);
  const dispatch = useDispatch();

  const deleteExercise = async () => {
    await exerciseService.remove(exercise)
    navigate("/exercises")
  }

  const openDeleteModal = () => {
    dispatch(setModal({ openModal: MODAL_TYPES.CONFIRM }));
  }

  const showDeleteModal = modals === MODAL_TYPES.CONFIRM;

  if (loading) return <div>Loading data...</div>
  if (!exercise) return <div>Could not find exercise</div>
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <div className="container">
        {showDeleteModal &&
          <ConfirmModal
            header={"Delete exercise"}
            show={showDeleteModal}
            body={`Delete exercise '${exercise.name}'?`}
            confirmModal={deleteExercise}
          />}
        <h1>{exercise.name}</h1>
        <section>Body Part: {exercise.bodyPart}</section>
        <section>Equipment: {exercise.equipment}</section>
        <section>Instructions: {exercise.instructions ?? 'No instructions'}</section>
        <Link to="/exercises"><Button variant="outline-primary">All exercises</Button></Link>
        <Button variant="success" className="mx-1" type="button" onClick={() => navigate(`/exercises/edit/${exercise.id}`)}>Edit</Button>
        <Button variant="danger" type="button" onClick={openDeleteModal}>Delete?</Button>
      </div>
      <ExerciseHistoryTabs exercise={exercise} />
    </>
  )
}
export default ExerciseDetails