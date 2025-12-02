import { v4 as uuidv4 } from 'uuid'

export const toKeyedObject = (object) => {
  return { ...object, key: uuidv4() }
}

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const INTERVAL_TIME = 100;

export const findIndexOfKey = (arr, key) => {
  let i = 0;
  for (i = 0; i < arr.length; i++) {
    if (arr[i].key === key) {
      return i
    }
  }
  return i
}

export const swapObjects = (arr, startIndex, swapIndex) => {
  const temp = { ...arr[swapIndex] }
  arr[swapIndex] = { ...arr[startIndex] }
  arr[startIndex] = temp
  return arr.map(obj => obj)
}

export const parseTime = (time) => {
  const hours = Math.floor(time / HOUR);
  const minutes = Math.floor((time / MINUTE) % 60);
  const seconds = Math.floor((time / SECOND) % 60);

  return { hours, minutes, seconds };
}

export const formatTime = (time) => {
  const { hours, minutes, seconds } = parseTime(time);
  const hoursTick = `${(hours < 10 ? "0" : "")}${hours}`;
  const minutesTick = `${(minutes < 10 ? "0" : "")}${minutes}`;
  const secondsTick = `${(seconds < 10 ? '0' : '')}${seconds}`;
  return `${hoursTick}:${minutesTick}:${secondsTick}`;
}

export const createCompletedWorkout = (workout) => {

  const completedExerciseGroups = workout.exerciseGroups
    .map(group => {
      const completedExerciseSets = group.exerciseSets.filter(set => set.completed)
      return { ...group, completedExerciseSets };
    })
    .filter(group => group.completedExerciseSets.length > 0);

  const startDate = Date.parse(workout.startTime);
  const endDate = workout.endTime ? Date.parse(workout.endTime) : Date.now();
  const time = endDate - startDate;
  const duration = formatTime(time);

  return {
    name: workout.name,
    note: workout.note,
    description: workout.description,
    workoutId: workout.workoutId,
    completedExerciseGroups,
    duration
  }
}

export const formatExerciseNames = (exerciseNames) => {
  const maxLength = 65;
  const joinedNames = exerciseNames.join(", ");
  return joinedNames.length < maxLength
    ? joinedNames
    : joinedNames.slice(0, maxLength) + "...";
}

export const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("workItOutState", serializedState);
  } catch (error) {
    console.error(error);
  }
}

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("workItOutState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}