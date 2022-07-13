import axios from 'axios'
const baseUrl = '/api/blogs'

const getToken = () => {
  const user = JSON.parse(window.localStorage.getItem('BlogsAppUser'))
  return `bearer ${user.token}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const del = async (id) => {
  const token = getToken()
  const config = {
    headers: {
      Authorization: token,
    },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response
}

export default { getAll, create, update, del }
