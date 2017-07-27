const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:reviewID/delete', async (request, response) => {
  const reviewID = request.params.reviewID
  const userID = request.session.userID

  try {
    if (!userID) {
      throw { message: 'You must be logged in to delete a review' }
    }

    const reviews = await dbReviews.getReviewByID(reviewID)
    const review = reviews[0]

    if (review.user_id != userID) {
      throw { message: 'You cannot delete a review which you didn\'t create' }
    }

    await dbReviews.deleteReview(reviewID)
    response.redirect('/users/' + userID)

  } catch (error) {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  }
})

router.get('/:albumID/new', async (request, response) => {
  const userID = request.session.userID
  const albumID = request.params.albumID

  try {
    if (!userID) {
      throw { message: 'You must be logged in to add a review' }
    }
    const albums = await dbAlbums.getAlbumsByID(albumID)
    const album = albums[0]

    response.render('new_review', {
      album: album,
      userID: request.session.userID
    })
  } catch (error) {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  }
})

router.post('/:albumID/new', async (request, response) => {
  const userID = request.session.userID
  const albumID = request.params.albumID
  const review = request.body.review

  try {
    if (!userID) {
      throw { message: 'You must be logged in to add a review' }
    }
    if (!review) {
      throw { message: 'You didn\'t write a review' }
    }

    await dbReviews.addReview(albumID, userID, review)
    response.redirect('/albums/' + albumID)
  } catch (error) {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  }
})

module.exports = router
