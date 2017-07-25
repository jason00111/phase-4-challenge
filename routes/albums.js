const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID

  dbAlbums.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error, userID: request.session.userID })
    } else {
      const album = albums[0]

      dbReviews.getReviewsByAlbumID(albumID, (error, reviews) => {
        if (error) {
          response.status(500).render('error', { error: error, userID: request.session.userID })
        } else {
          response.render('album', { album: album, reviews: reviews, userID: request.session.userID })
        }
      })
    }
  })
})

module.exports = router
