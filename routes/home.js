const router = require('express-promise-router')()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/', async (request, response) => {
  const albums = await dbAlbums.getAlbums()
  const reviews = await dbReviews.getRecentReviews()

  response.render('index', {
    albums: albums,
    reviews: reviews,
    userID: request.session.userID
  })
})

module.exports = router
