const query = require('./setup')

const search = function(queryString) {
  const searchString = `%${queryString}%`
  return query("SELECT * FROM albums WHERE title ILIKE $1", [searchString])
}

module.exports = {
  search
}
