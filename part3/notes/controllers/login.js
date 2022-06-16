const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { password, username } = request.body

  const user = await User.findOne({ username })
  const correctPassword = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if(!(user && correctPassword)) {
    return response
      .status(401)
      .json({ error: 'invalid username or password' })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  //token expires in one hour
  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*60 })

  response
    .status(200)
    .send({ token, user: user.name, username: user.username })
})

module.exports = loginRouter