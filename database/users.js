const query = require('./setup')

const addUser = function(name, email, password, callback) {
  query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password], callback)
}

const getUserByEmail = function(email, callback) {
  query("SELECT * FROM users WHERE email = $1", [email], callback)
}

const getUserByID = function(userID, callback) {
  query(`
    SELECT
      id, name, email, password, to_char(joined, 'FMMonth FMDD, YYYY') AS joined
    FROM
      users
    WHERE
      id = $1`,
    [userID], callback)
}

module.exports = {
  addUser,
  getUserByEmail,
  getUserByID
}
