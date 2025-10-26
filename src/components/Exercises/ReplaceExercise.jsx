import ExercisesSelection from "./ExercisesSelection"


const ReplaceExercise = ({ setSelectingExercises, setSelectedExercises, selectedExercises }) => {

  return (
    <ExercisesSelection
      setSelectingExercises={setSelectingExercises}
      setSelectedExercises={setSelectedExercises}
      selectedExercises={selectedExercises}
      maxSelection={1}
    />
  )
}

export default ReplaceExercise;