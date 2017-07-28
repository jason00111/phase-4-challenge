const query = require('./setup')

const search = queryString =>
  query("SELECT * FROM albums WHERE title ILIKE $1 OR artist ILIKE $1",
    [`%${queryString}%`])

module.exports = {
  search
}
