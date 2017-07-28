const router = require('express-promise-router')()
const dbSearch = require('../database/search')

router.get('/', (request, response) => {
  response.render('search', { userID: request.session.userID })
})

router.post('/', async (request, response) => {
  const query = request.body.query
  const albums = await dbSearch.search(query)
  response.render('search_results', { albums, userID: request.session.userID })
})

module.exports = router
