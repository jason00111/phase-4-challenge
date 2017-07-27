const router = require('express-promise-router')()
const dbUsers = require('../database/users')
const encrypt = require('../encrypt')

router.get('/', (request, response) => {
  response.render('signup', { userID: request.session.userID })
})

router.post('/', async (request, response) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password
  const users = await dbUsers.getUserByEmail(email)
  const user = users[0]

  if (user) {
    throw {message: 'There is already an account registered with this email.'}
  }

  const hash = await encrypt.hash(password)
  await dbUsers.addUser(name, email, hash)
  response.redirect('/signin')
})

module.exports = router
