import axios from "axios"

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
})

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error)
    throw error
  },
)

export default apiClient
