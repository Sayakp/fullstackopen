import React, { useState } from 'react'
import blogsService from '../services/blogs'

const NewBlogForm = ({ setBlogs, generateNotification, toggleForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const newBlog = { title, author, url }
      const test = await blogsService.create(newBlog)
      console.log(test)
      const updatedBlogList = await blogsService.getAll()
      setBlogs(updatedBlogList)
      const successNotification = {
        message: `a new blog ${newBlog.title} by ${newBlog.author} has been added`,
        type: 'success',
      }
      generateNotification(successNotification)
      setTitle('')
      setAuthor('')
      setUrl('')
      toggleForm()
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
      <h2>create new</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          title
          <input
            type="text"
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            value={title}
          />
        </div>
        <div>
          author
          <input
            type="text"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          url
          <input
            type="text"
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            value={url}
          />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default NewBlogForm
