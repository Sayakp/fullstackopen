import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import UserLogin from './components/UserLogin'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('BlogsAppUser')
    if (loggedUserJSON) {
      const blogsUser = JSON.parse(loggedUserJSON)
      setUser(blogsUser)
    }
  }, [])

  const onLogoutHandler = () => {
    setUser(null)
    window.localStorage.removeItem('BlogsAppUser')
  }

  return (
    <div>
      {user ? (
        <>
          <Blogs user={user} />
          <br />
          <button onClick={onLogoutHandler}>logout</button>
        </>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  )
}

export default App
