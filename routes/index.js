const router = require('express').Router()
const database = require('../database')

const signupRoute = require('./signup')
const signinRoute = require('./signin')
const albumsRoute = require('./albums')
const reviewsRoute = require('./reviews')
const usersRoute = require('./users')

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

router.get('/signout', (request, response) => {
  request.session = null
  response.redirect('/')
})

router.use('/signup', signupRoute)
router.use('/signin', signinRoute)
router.use('/albums', albumsRoute)
router.use('/reviews', reviewsRoute)
router.use('/users', usersRoute)

router.use((request, response) => {
  response.status(404).render('not_found', { userID: request.session.userID })
})

module.exports = router
