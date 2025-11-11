import axios from 'axios'

const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_DEV_API_URL
  : import.meta.env.VITE_BASE_PROD_API_URL
const url = baseUrl + 'completedWorkouts'

const getList = async () => {
  const response = await axios.get(url)
  return response.data
}

const getDetails = async (id) => {
  const response = await axios.get(`${url}/${id}`)
  return response.data
}

const create = async (object) => {
  const response = await axios.post(`${url}`, object)
  return response.data
}

const update = async (object) => {
  const response = await axios.put(`${url}/${object.id}`, object)
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${url}/${id}`)
}

export default { getList, getDetails, create, update, remove }