const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:albumID', async (request, response) => {
  const albumID = request.params.albumID

  try {
    const albums = await dbAlbums.getAlbumsByID(albumID)
    const reviews = await dbReviews.getReviewsByAlbumID(albumID)
    const album = albums[0]

    response.render('album', {
      album: album,
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
