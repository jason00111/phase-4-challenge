const router = require('express').Router()
const database = require('../database')

router.get('/:userID', (request, response) => {
  const userID = request.params.userID

  if (userID != request.session.userID) {
    response.redirect('/signin')
  } else {
    database.getUserByID(userID, (error, users) => {
      if (error) {
        response.status(500).render('error', { error: error, userID: request.session.userID })
      } else {
        const user = users[0]

        database.getReviewsByUserID(userID, (error, reviews) => {
          if (error) {
            response.status(500).render('error', { error: error, userID: request.session.userID })
          } else {
            response.render('profile', { user: user, reviews: reviews, userID: request.session.userID })
          }
        })
      }
    })
  }
})

module.exports = router
