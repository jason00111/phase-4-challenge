const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const database = require('./database')
const app = express()

const keys = require('./keys')
const signupRoute = require('./routes/signup')
const signinRoute = require('./routes/signin')
const albumsRoute = require('./routes/albums')

require('ejs')
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'user',
  keys: keys
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
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

app.use('/signup', signupRoute)

app.use('/signin', signinRoute)

app.use('/albums', albumsRoute)

app.get('/signout', (request, response) => {
  request.session = null
  response.redirect('/')
})

app.get('/users/:userID', (request, response) => {
  const userID = request.params.userID

  if (userID != request.session.userID) {
    response.redirect('/signin')
  } else {
    database.getUserByID(userID, (error, users) => {
      if (error) {
        response.status(500).render('error', { error: error, userID: request.session.userID })
      } else {
        const user = users[0]

        database.getReviewsByUserID(userID, (error, reviews) => {
          if (error) {
            response.status(500).render('error', { error: error, userID: request.session.userID })
          } else {
            response.render('profile', { user: user, reviews: reviews, userID: request.session.userID })
          }
        })
      }
    })
  }
})

app.use((request, response) => {
  response.status(404).render('not_found', { userID: request.session.userID })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
