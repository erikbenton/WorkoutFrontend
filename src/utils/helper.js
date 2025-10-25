import { v4 as uuidv4 } from 'uuid'

export const toKeyedObject = (object) => {
  return { ...object, key: uuidv4() }
}