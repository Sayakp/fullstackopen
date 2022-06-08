const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let { author, url, likes, title } = request.body
  if (likes === undefined)likes = 0
  if (title === undefined && url === undefined) {
    response.status(400).end()
  } else {
    const blog = new Blog({
      likes: likes,
      title: title,
      url: url,
      author: author
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  let { author, url, likes, title } = request.body
  if (likes === undefined)likes = 0
  if (title === undefined && url === undefined) {
    response.status(400).end()
  } else {
    const newBlog = {
      likes: likes,
      title: title,
      url: url,
      author: author
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter
