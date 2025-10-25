import { v4 as uuidv4 } from 'uuid'

export const toKeyedObject = (object) => {
  return { ...object, key: uuidv4() }
}

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