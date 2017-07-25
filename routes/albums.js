const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:albumID', (request, response) => {
  const albumID = request.params.albumID

  dbAlbums.getAlbumsByID(albumID, (error1, albums) => {
    if (error1) {
      response.status(500).render('error', {
        error: error1,
        userID: request.session.userID
      })
    } else {
      const album = albums[0]

      dbReviews.getReviewsByAlbumID(albumID, (error2, reviews) => {
        if (error2) {
          response.status(500).render('error', {
            error: error2,
            userID: request.session.userID
          })
        } else {
          response.render('album', {
            album: album,
            reviews: reviews,
            userID: request.session.userID
          })
        }
      })
    }
  })
})

module.exports = router
