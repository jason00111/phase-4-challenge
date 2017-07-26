const router = require('express').Router()
const dbUsers = require('../database/users')
const dbReviews = require('../database/reviews')

router.get('/:userID', (request, response) => {
  const userID = request.params.userID

  if (userID != request.session.userID) {
    response.redirect('/signin')
  } else {
    dbUsers.getUserByID(userID)
    .then(users => {
      const user = users[0]

      return dbReviews.getReviewsByUserID(userID)
      .then(reviews => {
        response.render('profile', {
          user: user,
          reviews: reviews,
          userID: request.session.userID
        })
      })
    })
    .catch(error => {
      response.status(500).render('error', {
        error: error,
        userID: request.session.userID
      })
    })
  }
})

module.exports = router
