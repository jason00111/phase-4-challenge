const router = require('express').Router()
const bcrypt = require('bcrypt')
const dbUsers = require('../database/users')

router.get('/', (request, response) => {
  response.render('signin', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  dbUsers.getUserByEmail(email, (error1, users) => {
    if (error1) {
      response.status(500).render('error', {
        error: error1,
        userID: request.session.userID
      })
    } else {
      const user = users[0]

      if (!user) {
        response.status(403).render('error', {
          error: { message: 'Email not found. Sign up first.' },
          userID: request.session.userID
        })
      } else {
        bcrypt.compare(password, user.password, (error2, match) => {
          if (error2) {
            response.status(500).render('error', {
              error: error2,
              userID: request.session.userID
            })
          } else if (match) {
            request.session.userID = user.id
            response.redirect(`users/${user.id}`)
          } else {
            response.status(403).render('error', {
              error: {message: 'Incorrect password.'},
              userID: request.session.userID
            })
          }
        })
      }
    }
  })
})

module.exports = router
