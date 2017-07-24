const router = require('express').Router()
const database = require('../database')

router.get('/', (request, response) => {
  response.render('signin')
})

router.post('/', (request, response) => {
  const email = request.body.email
  const password = request.body.password
  database.getUserByEmail(email, (error, users) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const user = users[0]

      if (!user) {
        response.status(403).render('error', {error: {message: 'Email not found. Sign up first.'}})
      } else if (user.password !== password) {
        response.status(403).render('error', {error: {message: 'Incorrect password.'}})
      } else {
        response.redirect(`users/${user.id}`)
      }
    }
  })
})

module.exports = router
