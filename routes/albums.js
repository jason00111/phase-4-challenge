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

module.exports = router
