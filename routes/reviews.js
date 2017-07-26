const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:reviewID/delete', (request, response) => {
  const reviewID = request.params.reviewID
  const userID = request.session.userID

  if (!userID) {
    response.render('error', {
      error: { message: 'You must be logged in to delete a review' },
      userID: request.session.userID
    })
  } else {
    dbReviews.getReviewByID(reviewID)
    .then(reviews => {
      const review = reviews[0]

      if (review.user_id != userID) {
        response.render('error', {
          error: { message: 'You cannot delete a review which you didn\'t create' },
          userID: request.session.userID
        })
      } else {
        return dbReviews.deleteReview(reviewID)
        .then(() => {
          response.redirect('/users/' + userID)
        })
      }
    })
    .catch(error => {
      response.status(500).render('error', {
        error: error,
        userID: request.session.userID
      })
    })
  }
})

router.get('/:albumID/new', (request, response) => {
  const userID = request.session.userID
  const albumID = request.params.albumID

  if (!userID) {
    response.render('error', {
      error: { message: 'You must be logged in to add a review' },
      userID: request.session.userID
    })
  } else {
    dbAlbums.getAlbumsByID(albumID)
    .then(albums => {
      const album = albums[0]
      response.render('new_review', { userID: request.session.userID, album: album })
    })
    .catch(error => {
      response.status(500).render('error', {
        error: error,
        userID: request.session.userID
      })
    })
  }
})

router.post('/:albumID/new', (request, response) => {
  const userID = request.session.userID
  const albumID = request.params.albumID
  const review = request.body.review

  if (!userID) {
    response.render('error', {
      error: { message: 'You must be logged in to add a review' },
      userID: request.session.userID
    })
  } else if (!review) {
    response.render('error', {
      error: { message: 'You didn\'t write a review' },
      userID: request.session.userID
    })
  } else {
    dbReviews.addReview(albumID, userID, review)
    .then(() => {
      response.redirect('/albums/' + albumID)
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
