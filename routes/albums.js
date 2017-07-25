const router = require('express').Router()
const database = require('../database')

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error, userID: request.session.userID })
    } else {
      const album = albums[0]

      database.getReviewsByAlbumID(albumID, (error, reviews) => {
        if (error) {
          response.status(500).render('error', { error: error, userID: request.session.userID })
        } else {
          response.render('album', { album: album, reviews: reviews, userID: request.session.userID })
        }
      })
    }
  })
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
    database.getAlbumsByID(albumID, (error, albums) => {
      const album = albums[0]
      response.render('newReview', { userID: request.session.userID, album: album })
    })
  }
})

//refactor into reviews
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
    database.addReview(albumID, userID, review, (error) => {
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
