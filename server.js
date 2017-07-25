const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const app = express()

const keys = require('./keys')
const routes = require('./routes')

require('ejs')
app.set('view engine', 'ejs');

app.use(cookieSession({
  name: 'user',
  keys: keys
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
