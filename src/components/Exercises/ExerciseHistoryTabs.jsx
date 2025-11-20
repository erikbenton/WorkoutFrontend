import { Tab, Tabs } from "react-bootstrap";
import ExerciseHistoryList from "./ExerciseHistoryList";
import useFetch from "../../hooks/useFetch";
import ExerciseHistoryChart from "../Charts/ExerciseHistoryChart";
import { getMaxWeight, getMaxEstimatedPersonalRecord, getTotalWork } from "../../utils/chartHelper";


const ExerciseHistoryTabs = ({ exercise }) => {
  const { data: exerciseHistory, loading, error } = useFetch(`completedExerciseGroups/${exercise.id}`);

  if (loading) return <p>Loading history...</p>
  if (error) return <p>Error fetching exercise history</p>

  return (
    <div>
      <hr className="mx-3" />
      <Tabs
        defaultActiveKey="list"
        id="fill-tab"
        className="no-tab-margin"
        fill
      >
        <Tab eventKey="list" title="Records">
          {exerciseHistory.length === 0
            ? <div className="container fs-3 mt-3">No history records</div>
            : <ExerciseHistoryList exercise={exercise} exerciseHistory={exerciseHistory} />
          }
        </Tab>
        <Tab eventKey="chart" title="Charts">
          {exerciseHistory.length <= 1
            ? <div className="container fs-3 mt-3">Not enough history to plot</div>
            : (<>
              <ExerciseHistoryChart
                label={`Max Weight (${exercise.name})`}
                exerciseHistory={exerciseHistory}
                getGroupDataValue={getMaxWeight} />
              <hr className="mx-3" />
              <ExerciseHistoryChart
                label={`Max Est. PR (${exercise.name})`}
                exerciseHistory={exerciseHistory}
                getGroupDataValue={getMaxEstimatedPersonalRecord} />
              <hr className="mx-3" />
              <ExerciseHistoryChart
                label={`Total Work (${exercise.name})`}
                exerciseHistory={exerciseHistory}
                getGroupDataValue={getTotalWork} />
            </>)
          }
        </Tab>
      </Tabs>
    </div>
  )
}

export default ExerciseHistoryTabs;