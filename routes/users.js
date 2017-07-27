const router = require('express').Router()
const dbUsers = require('../database/users')
const dbReviews = require('../database/reviews')

router.get('/:userID', async (request, response) => {
  const userID = request.params.userID

  try {
    if (userID != request.session.userID) {
      response.redirect('/signin')
      return
    }

    const users = await dbUsers.getUserByID(userID)
    const user = users[0]
    const reviews = await dbReviews.getReviewsByUserID(userID)

    response.render('profile', {
      user: user,
      reviews: reviews,
      userID: request.session.userID
    })
  } catch (error) {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  }

})

module.exports = router
