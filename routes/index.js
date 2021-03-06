const router = require('express').Router()

const signupRoute = require('./signup')
const signinRoute = require('./signin')
const signoutRoute = require('./signout')
const albumsRoute = require('./albums')
const reviewsRoute = require('./reviews')
const usersRoute = require('./users')
const homeRoute = require('./home')
const searchRoute = require('./search')

router.use('/', homeRoute)
router.use('/signup', signupRoute)
router.use('/signin', signinRoute)
router.use('/signout', signoutRoute)
router.use('/albums', albumsRoute)
router.use('/reviews', reviewsRoute)
router.use('/users', usersRoute)
router.use('/search', searchRoute)

router.use((request, response) => {
  response.status(404).render('not_found', { userID: request.session.userID })
})

module.exports = router
