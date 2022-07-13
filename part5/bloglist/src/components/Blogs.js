import React, { useEffect, useRef, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import NewBlogForm from './NewBlogForm'
import Togglable from './Togglable'
import Notification from './Notification'

const Blogs = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  })
  const blogFormRef = useRef()

  const updateBlogList = (updatedBlog) => {
    const updatedBlogsList = blogs.map((blog) => {
      return blog.id === updatedBlog.id ? updatedBlog : blog
    })
    setBlogs(updatedBlogsList)
  }

  const deleteBlog = (id) => {
    const updatedBlogsList = blogs.filter((blog) => blog.id !== id)
    setBlogs(updatedBlogsList)
  }

  const sortBlogList = (blogs) => {
    return blogs.sort((a, b) => {
      if (a.likes < b.likes) {
        return 1
      }
      return -1
    })
  }

  const generateNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, type: null })
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(sortBlogList(blogs))
    })
  }, [])

  return (
    <>
      <h2>blogs</h2>
      <div>{user.user} logged in</div>
      <br />
      <Notification notification={notification} />
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <NewBlogForm
          setBlogs={setBlogs}
          generateNotification={generateNotification}
          toggleForm={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          updateBlogList={updateBlogList}
          deleteBlog={deleteBlog}
        />
      ))}
    </>
  )
}

export default Blogs
