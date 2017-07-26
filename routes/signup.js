const router = require('express').Router()
const dbUsers = require('../database/users')
const encrypt = require('../encrypt')

router.get('/', (request, response) => {
  response.render('signup', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password

  dbUsers.getUserByEmail(email)
  .then(users => {
    if (users.length !== 0) {
      response.status(403).render('error', {
        error: { message: 'There is already an account registered with this email' },
        userID: request.session.userID
      })
    } else {
      return encrypt.hash(password)
      .then(hash => {
        return dbUsers.addUser(name, email, hash)
        .then(() => {
          response.redirect('/signin')
        })
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
