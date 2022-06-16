const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const { password, name, username } = request.body

  if(password.length<3 || username.length<3){
    return response
      .status(400)
      .json({ error: 'username and password must have at least 3 characters' })
  }

  const existingUser = await User.findOne({ username })

  if(existingUser){
    return response
      .status(400)
      .json({ error: 'username must be unique' })
  }

  const saltRound = 10
  const passwordHash = await bcrypt.hash(password, saltRound)

  const newUser = new User({
    name,
    username,
    passwordHash
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

module.exports = usersRouter



