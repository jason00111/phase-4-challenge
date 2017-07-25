const router = require('express').Router()
const database = require('../database')

router.get('/', (request, response) => {
  database.getAlbums((error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error, userID: request.session.userID })
    } else {
      database.getRecentReviews((error, reviews) => {
        if (error) {
          response.status(500).render('error', { error: error, userID: request.session.userID })
        } else {
          response.render('index', { albums: albums, reviews: reviews, userID: request.session.userID })
        }
      })
    }
  })
})

module.exports = router
