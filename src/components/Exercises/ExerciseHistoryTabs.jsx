import { Tab, Tabs } from "react-bootstrap";
import ExerciseHistoryList from "./ExerciseHistoryList";
import useFetch from "../../hooks/useFetch";
import MaxWeightChart from "../Charts/MaxWeightChart";


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
        <Tab eventKey="list" title="History">
          <ExerciseHistoryList exercise={exercise} exerciseHistory={exerciseHistory} />
        </Tab>
        <Tab eventKey="chart" title="Charts">
          <MaxWeightChart exercise={exercise} exerciseHistory={exerciseHistory} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default ExerciseHistoryTabs;