const router = require('express-promise-router')()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/:albumID', async (request, response) => {
  const albumID = request.params.albumID
  const albums = await dbAlbums.getAlbumsByID(albumID)
  const reviews = await dbReviews.getReviewsByAlbumID(albumID)
  const album = albums[0]

  response.render('album', { album, reviews, userID: request.session.userID })
})

module.exports = router
