import { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export const useResource = (baseUrl) => {
  const token = useSelector((state) => state.token)
  const [resources, setResources] = useState([])

  useEffect(() => {
    getAll()
  }, [baseUrl])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    setResources(response.data)
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    setResources(resources.concat(response.data))
  }

  const update = async (id, newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
    const updatedResource = response.data
    const updatedResources = resources.map((resource) =>
      resource.id === id ? updatedResource : resource
    )
    setResources(updatedResources)
    // createNotification(exception.response.data.error, 'alert', 3))
  }

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config)
    const updatedResources = resources.filter((resource) => resource.id !== id)
    setResources(updatedResources)
  }

  const service = {
    getAll,
    create,
    update,
    remove
  }

  return [
    resources, service
  ]
}