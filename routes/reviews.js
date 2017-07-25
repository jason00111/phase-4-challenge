const router = require('express').Router()
const database = require('../database')

router.get('/:reviewID/delete', (request, response) => {
  const reviewID = request.params.reviewID
  const userID = request.session.userID

  database.deleteReview(reviewID, error => {
    response.redirect('/users/' + userID)
  })
})

module.exports = router
