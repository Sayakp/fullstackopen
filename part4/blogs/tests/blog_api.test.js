const mongoose = require('mongoose')
const Blog = require('../models/blog')
const app = require('../app')
const supertest = require('supertest')
const helpers = require('./test_helper')
const { log } = require('nodemon/lib/utils')

const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helpers.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all blogs are returned', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(helpers.initialBlogs.length)
  })

  test('blogs unique identifier is named id', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
  })

  test('update blog information', async () => {
    const blogs = await helpers.blogsInDb()
    const blogBeforeUpdate = blogs[0]

    const changesToApply = { ...blogBeforeUpdate, likes: blogBeforeUpdate.likes+1 }
    delete changesToApply.id

    const updatedBlog = await api
      .put(`/api/blogs/${blogBeforeUpdate.id}`)
      .send(changesToApply)
      .expect(200)
    expect(updatedBlog.body.likes).toBe(blogBeforeUpdate.likes + 1 )

  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog title',
      author: 'Daniel',
      url: 'www.google.com',
      likes: 5,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helpers.blogsInDb()
    expect(blogs).toHaveLength(helpers.initialBlogs.length + 1)

    const titles = blogs.map((n) => n.title)
    expect(titles).toContain('New blog title')
  })

  test('new blog likes default to 0 if not specified', async () => {
    const newBlog = {
      title: 'New Blog title',
      author: 'Daniel',
      url: 'www.google.com',
    }

    const savedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(savedBlog.body.likes).toBe(0)
  })

  test('return (400 Bad Request) if a new blog is missing title and url', async () => {
    const newBlog = {
      author: 'Daniel',
      likes: 5,
    }
    await api.post('/api/blogs').send(newBlog).expect(400)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helpers.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDelete = await helpers.blogsInDb()
    expect(blogsAfterDelete).toHaveLength(blogsAtStart.length-1)

    const blogsId = blogsAfterDelete.map(blog => blog.id)
    expect(blogsId).not.toContain(blogToDelete.id)
  })
})

afterAll(() => {
  mongoose.connection.close()
})

