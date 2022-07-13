import React, { useState } from 'react'
import login from '../services/login'
import Notification from './Notification'
import PropTypes from 'prop-types'

const UserLogin = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })

  const generateNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const user = await login.login({ username, password })
      setUser(user)
      window.localStorage.setItem('BlogsAppUser', JSON.stringify(user))
    } catch (error) {
      const errorNotification = {
        message: error.response.data.error,
        type: 'error',
      }
      generateNotification(errorNotification)
    }
  }
  return (
    <>
      <h2>log in to application</h2>
      <Notification notification={notification} />
      <form onSubmit={onSubmitHandler}>
        <div>
          username
          <input
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            name="username"
            value={username}
          />
        </div>
        <div>
          password
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            name="password"
            value={password}
          />
        </div>
        <button>login</button>
      </form>
    </>
  )
}

UserLogin.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default UserLogin
