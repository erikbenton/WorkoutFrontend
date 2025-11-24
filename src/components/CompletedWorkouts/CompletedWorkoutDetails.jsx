import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Button } from "react-bootstrap";
import completedWorkoutService from "../../services/completedWorkout";
import { useDispatch, useSelector } from "react-redux";
import { MODAL_TYPES, setModal } from "../../reducers/modals";
import ConfirmModal from "../Modals/ConfirmModal";


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

  const totalReps = group => group.completedExerciseSets.reduce((acc, curr) => acc + curr.reps, 0);
  const totalWeight = group => group.completedExerciseSets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0);

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
          <li key={group.id}>
            <div className="card my-2">
              <div className="card-header">
                <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
              </div>
              <div className="card-body">
                {group.comment && <span className="card-text">{group.comment}</span>}
                <ol className="list-group list-group-flush">
                  {group.completedExerciseSets.map(set =>
                    <li className="list-group-item ps-0" key={set.id}>
                      {set.reps} reps {set.weight ? `x ${set.weight} lbs` : ''}
                    </li>
                  )}
                </ol>
              </div>
              <span className="card-footer">
                <span className="badge text-bg-primary">Reps: {totalReps(group)}</span>
                <span className="ms-1 badge text-bg-success">
                  {totalWeight(group) === 0 ? "" : `Weight: ${totalWeight(group)} lbs`}
                </span>
              </span>
            </div>
          </li>
        )}
      </ol>
      <Link to="/completedWorkouts">
        <Button variant="outline-primary">
          Workout Histories
        </Button>
      </Link>
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