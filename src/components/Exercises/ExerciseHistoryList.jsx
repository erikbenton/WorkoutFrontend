
const ExerciseHistoryList = ({ exercise, exerciseHistory }) => {

  const getDateDiff = (group) => {
    const now = new Date();
    const trimmedNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const then = new Date(group.year, group.month - 1, group.day);
    const convertToDaysFactor = 1000 * 60 * 60 * 24;
    // subtract one due to truncation of "then" date
    return Math.round((trimmedNow - then) / convertToDaysFactor);
  }

  const totalReps = group => group.completedExerciseSets.reduce((acc, curr) => acc + curr.reps, 0);
  const totalWeight = group => group.completedExerciseSets.reduce((acc, curr) => acc + (curr.weight ?? 0), 0);

  return (
    <div className="mt-3 container">
      <h4>{exercise.name} history</h4>
      <ol className="no-bullets">
        {exerciseHistory.map(group => (
          <li key={group.completedExerciseGroupId}>
            <div className="card my-3">
              <div className="card-header d-flex align-items-center">
                <span className="card-text">{group.month}/{group.day}/{group.year}</span>
                <span className="ms-auto">{getDateDiff(group)} days since</span>
              </div>
              <div className="card-body py-1">
                <ol className="list-group list-group-flush">
                  {group.completedExerciseSets.map(set => (
                    <li key={set.id} className="list-group-item ps-0">
                      {set.reps} reps {set.weight ? "x " + set.weight + " lbs" : ""}
                    </li>
                  ))}
                </ol>
              </div>
              <span className="card-footer">
                <span className="badge text-bg-primary">Reps: {totalReps(group)}</span>
                <span className="ms-1 badge text-bg-success">{totalWeight(group) === 0 ? "" : `Weight: ${totalWeight(group)} lbs`}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div >
  );

}

export default ExerciseHistoryList;