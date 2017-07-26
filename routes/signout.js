const router = require('express').Router()

router.get('/', (request, response) => {
  request.session = null
  response.redirect('/')
})

module.exports = router
