import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
  }
  
  const create = newPerson => {
    return axios.post(baseUrl, newPerson)
  }

  const deletePerson = (id) => {
    
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data) 
  }

  const updatePerson = (updatedPerson, person) => {
    return axios.put(`${baseUrl}/${person.id}`, updatedPerson)
  }

  export default { getAll, create, deletePerson, updatePerson }