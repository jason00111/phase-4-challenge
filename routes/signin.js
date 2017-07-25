const router = require('express').Router()
const dbUsers = require('../database/users')

router.get('/', (request, response) => {
  response.render('signin', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  dbUsers.getUserByEmail(email, (error, users) => {
    if (error) {
      response.status(500).render('error', {
        error: error,
        userID: request.session.userID
      })
    } else {
      const user = users[0]

      if (!user) {
        response.status(403).render('error', {
          error: { message: 'Email not found. Sign up first.' },
          userID: request.session.userID
        })
      } else if (user.password !== password) {
        response.status(403).render('error', {
          error: {message: 'Incorrect password.'},
          userID: request.session.userID
        })
      } else {
        request.session.userID = user.id
        response.redirect(`users/${user.id}`)
      }
    }
  })
})

module.exports = router
