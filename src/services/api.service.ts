import axios, { AxiosResponse } from 'axios'

const fetchData = async (url: string) => {
  try {
    const response: AxiosResponse<any> = await axios(url)
    return response
  } catch (error) {
    throw error
  }
}

export { fetchData }
