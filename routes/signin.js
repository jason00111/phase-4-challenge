const router = require('express').Router()
const encrypt = require('../encrypt')
const dbUsers = require('../database/users')

router.get('/', (request, response) => {
  response.render('signin', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  dbUsers.getUserByEmail(email)
  .then(users => {
    const user = users[0]

    if (!user) {
      response.status(403).render('error', {
        error: { message: 'Email not found. Sign up first.' },
        userID: request.session.userID
      })
    } else {
      return encrypt.compare(password, user.password)
      .then(match => {
        if (match) {
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
  })
  .catch(error => {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  })
})

module.exports = router
