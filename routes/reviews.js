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
    dbReviews.getReviewByID(reviewID, (error, reviews) => {
      if (error) {
        response.render('error', {
          error: error,
          userID: request.session.userID
        })
      } else {
        const review = reviews[0]

        if (review.user_id != userID) {
          response.render('error', {
            error: { message: 'You cannot delete a review which you didn\'t create' },
            userID: request.session.userID
          })
        } else {
          dbReviews.deleteReview(reviewID, error => {
            response.redirect('/users/' + userID)
          })
        }
      }
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
    // check this, do we really need albums here?
    dbAlbums.getAlbumsByID(albumID, (error, albums) => {
      const album = albums[0]
      response.render('newReview', { userID: request.session.userID, album: album })
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
    dbReviews.addReview(albumID, userID, review, (error) => {
      if (error) {
        response.status(500).render('error', {
          error: error,
          userID: request.session.userID
        })
      } else {
        response.redirect('/albums/' + albumID)
      }
    })
  }
})

module.exports = router
