import React from 'react'
import axios from 'axios'

const Users = () => {

  const getAll = () => {
    const request = axios.get('/api/users')
    console.log('asdfasdf', request.then(response => response.data))
    // return request.then(response => response.data)
  }

  return (
    <div>
      Here resides the list of users
      {getAll()}
    </div>
  )
}

export default Users