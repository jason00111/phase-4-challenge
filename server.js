const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const database = require('./database')
const app = express()

const keys = require('./keys')
const signupRoute = require('./routes/signup')
const signinRoute = require('./routes/signin')
const albumsRoute = require('./routes/albums')
const reviewsRoute = require('./routes/reviews')
const usersRoute = require('./routes/users')
const indexRoute = require('./routes')

require('ejs')
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'user',
  keys: keys
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', indexRoute)

app.use('/signup', signupRoute)

app.use('/signin', signinRoute)

app.use('/albums', albumsRoute)

app.use('/reviews', reviewsRoute)

app.use('/users', usersRoute)

app.get('/signout', (request, response) => {
  request.session = null
  response.redirect('/')
})

app.use((request, response) => {
  response.status(404).render('not_found', { userID: request.session.userID })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
