const router = require('express').Router()
const encrypt = require('../encrypt')

const { userExists } = require('./helpers')

router.get('/', (request, response) => {
  response.render('signin', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const email = request.body.email
  const password = request.body.password

  userExists(email)
  .then(user => {
    return encrypt.compare(password, user.password)
    .then(match => {
      request.session.userID = user.id
      response.redirect(`users/${user.id}`)
    })
  })
  .catch(error => {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  })
})

module.exports = router
