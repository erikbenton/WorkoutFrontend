import axios from 'axios'

const baseUrl = 'https://localhost:7185/api/exercises/bodyParts'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }