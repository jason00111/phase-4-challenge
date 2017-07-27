const router = require('express-promise-router')()

router.get('/', (request, response) => {
  request.session = null
  response.redirect('/')
})

module.exports = router
