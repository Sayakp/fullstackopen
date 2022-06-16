const mongoose = require('mongoose')
const User = require('../models/user')
const app = require('../app')
const supertest = require('supertest')
const helpers = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helpers.initialUsers)
})

describe('creation of a user', () => {
  test('error when username has less than 3 characters', async () => {
    const newUser = {
      username: '12',
      name: 'testname',
      password: 'test123'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('error when password has less than 3 characters', async () => {
    const newUser = {
      username: 'testusername',
      name: 'testname',
      password: 'te'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('error when username already exists', async () => {
    const currentUsers = await helpers.usersInDb()
    const newUser = {
      username: currentUsers[0].username,
      name: 'testname',
      password: 'test123'
    }
    await api.post('/api/users').send(newUser).expect(400)
  })

  test('new user is added', async () => {
    const usersBeforeCreation = await helpers.usersInDb()
    const newUser = {
      username: 'new_username',
      name: 'testname',
      password: 'test123'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAfterCreation = await helpers.usersInDb()
    expect(usersAfterCreation).toHaveLength(usersBeforeCreation.length + 1)

    const usernames = usersAfterCreation.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})