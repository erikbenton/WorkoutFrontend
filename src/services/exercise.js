import axios from 'axios'

const baseUrl = 'https://localhost:7185/api/exercises'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getDetails = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async object => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async object => {
  const response = await axios.put(`${baseUrl}/${object.id}`, object)
  return response.data
}

const remove = async object => {
    const response = await axios.delete(`${baseUrl}/${object.id}`)
  return response.data
}

export default { getAll, getDetails, create, update, remove }