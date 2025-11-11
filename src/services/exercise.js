import axios from 'axios'

const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_DEV_API_URL
  : import.meta.env.VITE_BASE_PROD_API_URL
const url = baseUrl + 'exercises'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getDetails = async (id) => {
  const response = await axios.get(`${url}/${id}`)
  return response.data
}

const create = async object => {
  const response = await axios.post(url, object)
  return response.data
}

const update = async object => {
  const response = await axios.put(`${url}/${object.id}`, object)
  return response.data
}

const remove = async object => {
    const response = await axios.delete(`${url}/${object.id}`)
  return response.data
}

export default { getAll, getDetails, create, update, remove }