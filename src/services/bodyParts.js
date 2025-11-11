import axios from 'axios'

const baseUrl = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_DEV_API_URL
  : import.meta.env.VITE_BASE_PROD_API_URL
const url = baseUrl + 'exercises/bodyParts'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

export default { getAll }