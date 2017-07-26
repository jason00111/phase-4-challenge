const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

router.get('/', (request, response) => {
  Promise.all([
    dbAlbums.getAlbums(),
    dbReviews.getRecentReviews()
  ])
  .then(([albums, reviews]) => {
    response.render('index', {
      albums: albums,
      reviews: reviews,
      userID: request.session.userID
    })
  })
  .catch(error => {
    response.status(500).render('error', {
      error: error,
      userID: request.session.userID
    })
  })
})

module.exports = router
