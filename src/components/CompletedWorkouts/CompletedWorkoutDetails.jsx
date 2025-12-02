import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";
import completedWorkoutService from "../../services/completedWorkout";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES, setModal } from "../../reducers/modals";
import ConfirmModal from "../Modals/ConfirmModal";
import CompletedExerciseGroupDetails from "./CompletedExerciseGroupDetails";
import { reRunWorkout } from "../../reducers/runningWorkout";


const CompletedWorkoutDetails = () => {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const { data: completedWorkout, loading, error } = useFetch(`completedWorkouts/${id}`);
  const dispatch = useDispatch();
  const modals = useSelector(state => state.modals);

  if (loading) return <h1>Loading workout...</h1>
  if (error) return <h1>error</h1>

  const getFormatedCompletion = (workout) => {
    const dateNoTime = workout.createdAt.split("T")[0];
    return dateNoTime;
  }

  const reRunCompletedWorkout = () => {
    dispatch(reRunWorkout(completedWorkout));
    navigate("/runningWorkout")
  }

  const promptToDelete = () => {
    dispatch(setModal({ openModal: MODAL_TYPES.DELETE_WORKOUT }))
  }

  const deleteWorkout = async () => {
    try {
      await completedWorkoutService.remove(completedWorkout.id)
      navigate("/completedWorkouts");
    } catch (error) {
      console.error(error);
    }
  }

  const showDeleteModal = modals === MODAL_TYPES.DELETE_WORKOUT;

  return (
    <div className="container">
      {showDeleteModal &&
        <ConfirmModal
          show={showDeleteModal}
          header="Delete workout"
          body="Delete this workout record?"
          confirmModal={deleteWorkout}
        />}
      <h1>{completedWorkout.name} - {getFormatedCompletion(completedWorkout)}</h1>
      <p>Duration: {completedWorkout.duration}</p>
      <ol className="no-bullets">
        {completedWorkout.completedExerciseGroups.map(group =>
          <CompletedExerciseGroupDetails key={group.id} group={group} />
        )}
      </ol>
      <Link to="/completedWorkouts">
        <Button variant="outline-primary">
          Workout Histories
        </Button>
      </Link>
      <Button
        variant="primary"
        type="button"
        className="ms-1"
        onClick={reRunCompletedWorkout}
      >
        Re-run?
      </Button>
      <Button
        variant="danger"
        type="button"
        className="ms-1"
        onClick={promptToDelete}
      >
        Delete?
      </Button>
    </div>
  )
}

export default CompletedWorkoutDetails;