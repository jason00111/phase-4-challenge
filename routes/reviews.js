const router = require('express').Router()
const database = require('../database')

router.get('/:reviewID/delete', (request, response) => {
  const reviewID = request.params.reviewID
  const userID = request.session.userID

  if (!userID) {
    response.render('error', { error: {
      message: 'You must be logged in to delete a review' },
      userID: request.session.userID
    })
  } else {
    database.deleteReview(reviewID, error => {
      response.redirect('/users/' + userID)
    })
  }
})

module.exports = router
