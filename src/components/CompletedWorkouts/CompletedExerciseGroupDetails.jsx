import { Link } from "react-router-dom";
import { setTypeColor } from "../../utils/setTypes";

const CompletedExerciseGroupDetails = ({ group }) => {

  const totalReps = group => group.completedExerciseSets.reduce((acc, curr) => acc + curr.reps, 0);
  const totalWeight = group => group.completedExerciseSets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0);

  return (
    <li key={group.id}>
      <div className="card my-2">
        <div className="card-header">
          <Link to={`/exercises/${group.exercise.id}`}>{group.exercise.name}</Link>
        </div>
        <div className="card-body">
          {group.comment &&
            <div>
              <span className="card-text">{group.comment ?? ""}</span>
              <hr />
            </div>
          }
          <ol className="list-group list-group-flush">
            {group.completedExerciseSets.map(set =>
              <li className="list-group-item ps-0" key={set.id}>
                <div className="row">
                  <span className="col-3 text-end">{set.reps} reps</span>
                  <span className="col-3 text-start ps-0">{set.weight ? `x ${set.weight} lbs` : ''}</span>
                  <span className="badge py-2 w-100 col" style={{ backgroundColor: setTypeColor(set) }}>{set.setType}</span>
                </div>
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
  );
}

export default CompletedExerciseGroupDetails;