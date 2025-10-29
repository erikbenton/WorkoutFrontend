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
      group.completedExerciseSets = group.exerciseSets.filter(set => set.completed)
    })
    .filter(group => group.completedExerciseSets.length > 0);

  const startDate = Date.parse(workout.startTime);
  const endDate = workout.endTime ? Date.parse(workout.endTime) : Date.now();
  const time = endDate - startDate;
  const duration = formatTime(time);
  
  return {
    name: workout.name,
    note: workout.note,
    workoutId: workout.selectedWorkout ? workout.selectedWorkout.id : null,
    completedExerciseGroups,
    duration
  }
}