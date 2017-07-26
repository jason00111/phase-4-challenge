const router = require('express').Router()
const encrypt = require('../encrypt')
const dbUsers = require('../database/users')

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

const userExists = function(email) {
  return new Promise((resolve, reject) => {
    dbUsers.getUserByEmail(email)
    .then(users => {
      const user = users[0]

      if (!user) {
        reject({message: 'Email not found. Sign up first.'})
      } else {
        resolve(user)
      }
    })
    .catch(error => reject(error))
  })
}

module.exports = router
