const router = require('express').Router()
const dbAlbums = require('../database/albums')
const dbReviews = require('../database/reviews')

const signupRoute = require('./signup')
const signinRoute = require('./signin')
const albumsRoute = require('./albums')
const reviewsRoute = require('./reviews')
const usersRoute = require('./users')

router.get('/', (request, response) => {
  dbAlbums.getAlbums((error1, albums) => {
    if (error1) {
      response.status(500).render('error', {
        error: error1,
        userID: request.session.userID
      })
    } else {
      dbReviews.getRecentReviews((error2, reviews) => {
        if (error2) {
          response.status(500).render('error', {
            error: error2,
            userID: request.session.userID
          })
        } else {
          response.render('index', {
            albums: albums,
            reviews: reviews,
            userID: request.session.userID
          })
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
