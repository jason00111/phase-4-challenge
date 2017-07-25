const router = require('express').Router()
const dbUsers = require('../database/users')

router.get('/', (request, response) => {
  response.render('signup', { userID: request.session.userID })
})

router.post('/', (request, response) => {
  const name = request.body.name
  const email = request.body.email
  const password = request.body.password

  dbUsers.getUserByEmail(email, (error, users) => {
    if (users.length !== 0) {
      response.status(403).render('error', {
        error: { message: 'There is already an account registered with this email' },
        userID: request.session.userID
      })
    } else {
      dbUsers.addUser(name, email, password, error => {
        if (error) {
          response.status(500).render('error', { error: error })
        } else {
          response.redirect('/signin')
        }
      })
    }
  })

})

module.exports = router
