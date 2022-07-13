import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogList, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [showContent, setShowContent] = useState(false)

  const onLikeHandler = async () => {
    const { author, url, likes, user, title, id } = blog
    const newBlog = {
      author,
      title,
      url,
      user: user.id,
      likes: likes + 1,
    }
    blogService
      .update(newBlog, id)
      .then((response) => {
        updateBlogList(response)
      })
      .catch((e) => console.log(e))
  }

  const onDeleteHandler = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .del(blog.id)
        .then(() => {
          deleteBlog(blog.id)
        })
        .catch((e) => console.log(e))
    }
  }

  const blogContent = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={onLikeHandler}>like</button>
      </div>
      <div>{blog.author}</div>
      {blog.user.username === user.username && (
        <div>
          <button onClick={onDeleteHandler}>remove</button>
        </div>
      )}
    </>
  )

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={() => setShowContent(!showContent)}>
          {showContent ? 'hide' : 'view'}
        </button>
      </div>
      {showContent && blogContent()}
    </div>
  )
}

export default Blog
