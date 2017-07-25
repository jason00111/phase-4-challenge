const router = require('express').Router()
const database = require('../database')

router.get('/', (request, response) => {
  response.render('signup')
})

router.post('/', (request, response) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password
  database.addUser(name, email, password, error => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.redirect('/signin')
    }
  })
})

module.exports = router
