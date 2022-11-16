import { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setResources } from '../reducers/resourcesReducer'

const getNameFromURL = (baseUrl) => {
  let substringArray = baseUrl.split('/')
  return substringArray.pop()
}

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
  const dispatch = useDispatch()
  const resourcesName = getNameFromURL(baseUrl)
  const token = useSelector((state) => state.token)
  const resourcesContainer = useSelector((state) => state.resources)
  const resourcesObject = resourcesContainer.find(res => res.name === resourcesName)
  const resources = resourcesObject.dataArray

  useEffect(() => {
    getAll()
  }, [baseUrl])

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    dispatch(setResources(resourcesName, response.data))
  }

  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    dispatch(setResources(resourcesName, resources.concat(response.data)))
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
    dispatch(setResources(resourcesName, updatedResources))
  }

  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${id}`, config)
    const updatedResources = resources.filter((resource) => resource.id !== id)
    dispatch(setResources(resourcesName, updatedResources))
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