import setTypes from "./setTypes";

export const getMaxWeight = group => {
  return group.completedExerciseSets.reduce(
    (max, curr) => (curr.weight ?? 0) > max ? curr.weight : max, 0);
};

export const getMaxEstimatedPersonalRecord = group => {
  return group.completedExerciseSets.reduce(
    (max, curr) => {
      const weight = (curr.weight ?? 0);
      const personalRecord = weight * (1.0 + (curr.reps / 30.0))
      return personalRecord > max ? personalRecord : max
    }, 0);
};

export const getTotalWork = group => {
  return group.completedExerciseSets.reduce(
    (sum, curr) => {
      if (curr.setType === setTypes.warmup.type) {
        return sum;
      }

      const work = curr.weight
        ? curr.weight * curr.reps
        : curr.reps;

      return sum + work;
    }, 0);
};