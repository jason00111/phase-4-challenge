const router = require('express').Router()
const bcrypt = require('bcrypt')
const dbUsers = require('../database/users')

const saltRounds = 10

router.get('/', (request, response) => {
  response.render('signup', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password

  dbUsers.getUserByEmail(email, (error1, users) => {
    if (error1) {
      response.status(500).render('error', {
        error: error1,
        userID: request.session.userID
      })
    } else if (users.length !== 0) {
      response.status(403).render('error', {
        error: { message: 'There is already an account registered with this email' },
        userID: request.session.userID
      })
    } else {
      bcrypt.hash(password, saltRounds, (error2, hash) => {
        if (error2) {
          response.status(500).render('error', {
            error: error2,
            userID: request.session.userID
          })
        } else {
          dbUsers.addUser(name, email, hash, error3 => {
            if (error3) {
              response.status(500).render('error', {
                error: error3,
                userID: request.session.userID
              })
            } else {
              response.redirect('/signin')
            }
          })
        }
      })
    }
  })

})

module.exports = router
