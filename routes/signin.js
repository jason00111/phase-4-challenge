const router = require('express').Router()
const dbUsers = require('../database/users')
const encrypt = require('../encrypt')

router.get('/', (request, response) => {
  response.render('signin', { userID: request.session.userID })
})

router.post('/', async (request, response) => {
  const email = request.body.email
  const password = request.body.password

  try {
    const users = await dbUsers.getUserByEmail(email)
    const user = users[0]

    if (!user) {
      throw {message: 'Email not found. Sign up first.'}
    }

    const match = await encrypt.compare(password, user.password)

    request.session.userID = user.id
    response.redirect(`users/${user.id}`)

  } catch (error) {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  }
})

module.exports = router
