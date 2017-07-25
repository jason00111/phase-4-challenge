const router = require('express').Router()
const dbUsers = require('../database/users')
const dbReviews = require('../database/reviews')

router.get('/:userID', (request, response) => {
  const userID = request.params.userID

  if (userID != request.session.userID) {
    response.redirect('/signin')
  } else {
    dbUsers.getUserByID(userID, (error1, users) => {
      if (error1) {
        response.status(500).render('error', {
          error: error1,
          userID: request.session.userID
        })
      } else {
        const user = users[0]

        dbReviews.getReviewsByUserID(userID, (error2, reviews) => {
          if (error2) {
            response.status(500).render('error', {
              error: error2,
              userID: request.session.userID
            })
          } else {
            response.render('profile', {
              user: user,
              reviews: reviews,
              userID: request.session.userID
            })
          }
        })
      }
    })
  }
})

module.exports = router
