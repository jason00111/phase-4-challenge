const router = require('express').Router()
const dbSearch = require('../database/search')

router.get('/', (request, response) => {
  response.render('search', {userID: request.session.userID})
})

router.post('/', (request, response) => {
  const query = request.body.query
  dbSearch.search(query)
  .then(albums => {
    response.render('search_results', {
      albums,
      userID: request.session.userID
    })
  })
})

module.exports = router
